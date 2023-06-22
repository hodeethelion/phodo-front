import * as React from 'react';

//component
import Header from '../../components/mypage/Header'
import MainPost from '../../components/Main/MainPost'
import { ExampleCard } from '../../components/Main/exampleCard'


export const MainPage =() => {

    return (
    <div>
      <Header className="fixed top-0 w-full z-50" />
      <div className="flex justify-center">
        <div className="w-3/5">
          <div className="mt-20 mb-20" style={{ marginTop: '100px' }}>
            <MainPost />
          </div>
          <div className="mb-20">
            <ExampleCard />
          </div>
        </div>
      </div>
    </div>


    )
}
