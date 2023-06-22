import 'tailwindcss/tailwind.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { request } from "../../utils/axios-utils"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

//custom hook
import useFormatDate from '../../hooks/useFormatDate';

const fetchGallery = () => {
    return request({ url: 'api/gallery' });
}

const postActiveTags = (activeTags) => {
    return request({ url: 'api/galleryTags', method: 'POST', data: { tags: activeTags } });
}


const GalleryBox = () => {
    const buttons = ['tool', 'animal', 'clothing', 'vehicle', 'food', 'person', 'building', 'sports equipment', 'furniture', 'kitchenware', 'office supplies', 'plant'];
    const [activeButtons, setActiveButtons] = useState({})

    // get 
    const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery);

    // post
    const mutation = useMutation(postActiveTags, {
        onSuccess: (data) => {
            console.log('activeButtons post success', data);
            setImagesData(data);
        },
        onError: (error) => {
            console.log('activeButtons post fail', error);
        }
    });

    const [imagesData, setImagesData] = useState(null);

    const handleClick = (button) => {
        setActiveButtons(prevState => {
            const newState = { ...prevState, [button]: !prevState[button] };
            const activeTags = Object.keys(newState).filter(key => newState[key]);
            mutation.mutate(activeTags);
            return newState;
        });
    };

    const formatData = useFormatDate();

    useEffect(() => {
        if (!isLoading && initialData) {
            setImagesData(initialData);
        }
    }, [isLoading, initialData]);

    if(isLoading) {return <h2>Loading...</h2>}
    if(isError) {return <h2>{error.message}</h2>}
    /* ---------------------------------------------------------------------------------- */
    return (
        <div>
            <div className='flex flex-wrap justify-center'> 보고싶은 사진의 tag를 선택하세요! </div>
                <div className="button-box bg-purple-100 h-20 mb-2 rounded-lg shadow-lg flex flex-wrap justify-center items-center">
                    {buttons.map((button) => (
                        <React.Fragment key={button}>
                            <section>
                                <button
                                    onClick={() => handleClick(button)} 
                                    className={`rounded-full px-2 py-1 text-black shadow mx-1 my-1 ${(activeButtons[button] === true)? 'bg-blue-500' : 'bg-white'}`}>
                                    {button}
                                </button>
                            </section>
                        </React.Fragment>
                    ))}
                </div>
                <ImageList sx={{ width: '100%', height: 450, gap: 16 }} cols={3} rowHeight={164}>
                    {imagesData?.data?.map((image) => (
                        <ImageListItem key={image._id}>
                        <img
                            src={`${image.url}?w=248&fit=crop&auto=format`}
                            alt='loading...'
                            loading="lazy"
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        />
                        <ImageListItemBar
                            title={
                                <span>
                                    {Object.values(image.tags).map((tag, index) => {
                                        return index < Object.values(image.tags).length - 1 ? <p key={index}>`${tag}, `</p> : <p>tag</p>;
                                    })}
                                </span>
                            }
                            subtitle={
                                <span>{formatData(image.time)}</span>
                            }
                            position="bottom"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
        </div>
    );
};

export default GalleryBox;