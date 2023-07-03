import React, { useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { request } from "../../utils/axios-utils"
import './../../index.css'
import './QuillEditor.css'

Quill.register('modules/ImageResize', ImageResize);

const modules = {
	toolbar: [
        [{ 'font': ['sans-serif', 'arial', 'IBM Plex Sans KR', 'courier'] }],
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image'],
		[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
		['clean']
	],

  	/* 추가된 코드 */
	ImageResize: {
		parchment: Quill.import('parchment')
	}
};



const QuillEditor = () => {
    let { projectId } = useParams();
    console.log('project Id: ', projectId);
    const [value, setValue] = useState('');
    const editorRef = useRef(null);
    const [projectName, setProjectName] = useState(''); // added this line


    useEffect(() => {
        // Fetch the initial content from the server
        // request({
        //     method: 'get',
        //     url: `/project/report/${projectId}`,
        // })
        // .then(res => {
            // console.log(res.data);
            // Structure the HTML based on the response
            const contentHtml = `
            <br>
            <h1>에어컨 장비 대여 업체 결산 보고서</h1>
<br>
<br>
<h2>1. 장비 현황</h2>
<br>
<ul>
<li>
    <h3>외관 불량 에어컨 목록</h3>
    <p>불량 에어컨 리스트 중 LG와 삼성 브랜드의 상태가 가장 심각하며, 얼룩, 먼지, 변색 등 청결 상태도 불량합니다. 특히, 외장재와 연결 호스 파손이 대부분을 차지하고 있습니다.</p>
    <p>특히 삼성 브랜드의 경우에는 먼지와 변색 문제가 두드러지게 보이며, LG 브랜드는 외장재와 연결 호스 파손이 빈번하게 보고되었습니다.</p>
</li>
<li>
    <h3>불량 에어컨 부품 목록</h3>
    <p>불량 부품 목록을 살펴보면, 파손된 동관, 냉매, 내부 필터, 배관이 대부분입니다.</p>
    <p>이러한 문제들은 에어컨의 효율성과 성능을 크게 저하시키며, 빠른 대체나 수리가 요구됩니다.</p>
</li>
<li>
    <h3>에어컨 수리 도구 목록</h3>
    <p>수리에 주로 사용되는 도구로는 드라이버, 몽키스패너, 파이프 렌치, 드릴이 있습니다.</p>
    <p>이러한 도구들은 정기적인 검사와 관리가 필요합니다.</p>
</li>
</ul>
<br>
<br>
<h2>2. 고객 불만 사항</h2>
<br>
<ul>
<li>
    <h3>수리 서비스 불만 사항 정리</h3>
    <p>고객들은 주로 서비스 직원의 불친절과 수리 작업의 지연에 대한 불만을 제기하였습니다.</p>
    <p>이러한 문제들은 우리의 서비스 품질 개선이 시급함을 보여주며, 즉각적인 대응과 개선은 우리의 사업 성공에 결정적인 요인이 될 것입니다.</p>
</li>
<li>
    <h3>에어컨 성능 불만 사항 정리</h3>
    <p>고객들은 주로 에어컨의 온도 불안정, 냄새 발생, 누수, 고장 등의 문제를 제기하였습니다.</p>
    <p>고객의 만족도를 높이기 위해, 이러한 문제들을 해결하는 것이 우리의 핵심 목표가 되어야 합니다.</p>
</li>
<li>
    <h3>에어컨 수리 비용 불만사항 정리</h3>
    <p>고객들은 과도한 과금과 현금 결제 유도에 대해 불만을 표현하였습니다.</p>
    <p>이에 따라 우리는 고객들에게 합리적이고 투명한 비용 청구 방안을 마련해야 합니다.</p>
</li>
</ul>
<br>
<br>
<h2>3. 관련 서류</h2>
<br>
<ul>
<li>
    <h3>에어컨 감가상각 관련 재무제표</h3>
    <p>에어컨의 감가상각비는 2억원이고, 판매관리비는 5억원입니다. 고정비용은 3억원이며, 유동비용은 1억원입니다. 현재 고정자산은 총 10억원입니다.</p>
    <p>이 데이터는 우리 회사의 재무 상태를 정확히 파악하고, 향후 비즈니스 전략을 수립하는데 중요한 역할을 합니다.</p>
</li>
<li>
    <h3>이번달 손익 현금흐름표</h3>
    <p>이번 달의 영업이익은 4억원이며, 당기순이익은 3억원입니다. 이 수치는 우리 회사의 이번 달 매출과 이익 상태를 나타냅니다.</p>
    <p>이를 통해 우리는 이익과 지출을 관리하며, 향후 비즈니스 전략을 수립할 수 있습니다.</p>
</li>
<li>
    <h3>에어컨 관련 소모품 재고</h3>
    <p>현재 냉매, 배관, 필터 등의 소모품 재고 수량은 적절하게 유지되고 있습니다.</p>
    <p>우리는 소모품 재고 수량을 신중하게 관리하며, 부족한 부품이 발생하지 않도록 주의해야 합니다.</p>
</li>
</ul>
<br>
<br>
<h3> [ 첨부사진 ] </h3>
        `;
            

            // Update the editor's content when the response is received
            setValue(contentHtml);
        // })
        // .catch(err => {
        //     console.error(err);
        // });
}, []); // The empty array causes this useEffe

    useEffect(() => {
        // Fetch the project name
        request({
            method: 'get',
            url: `/project/name/${projectId}`,
        })
        .then(res => {
            setProjectName(res.data.name); // assuming the response has a "name" field
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const exportAsPDF = () => {
        const editor = document.querySelector('.ql-editor');
        html2canvas(editor, {scale : 2}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData)

            const pdfWidth = 190;
            const pageHeight = pdfWidth * 1.414;
            const pdfHeight = canvas.height * pdfWidth / canvas.width;
            const heightLeft = pdfHeight;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps= pdf.getImageProperties(imgData);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 10, 0, pdfWidth, pdfHeight);
            pdf.line(15, 8, 195, 8);
            pdf.line(15, 289, 195, 289);
            pdf.save("download.pdf");
        });
    };    

    return (
        <div>
        <h1 className='flex-auto text-center'> {projectName}  </h1>
        <button className="button" onClick={exportAsPDF}>
            PDF로 출력해보세요!
          </button>
        <ReactQuill 
            theme="snow" 
            className='h-screen'
            value={value} 
            onChange={setValue}
            modules={modules}
            ref={editorRef}
        />
        
        </div>
    );
};

export default QuillEditor;