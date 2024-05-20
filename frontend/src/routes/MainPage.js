import '../App.css';
import "../component/SearchBar.module.css";
import "./MainPage.css";

import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import SearchBar from '../component/SearchBar';

import Header from '../component/Header';

function MainPage() {
  // 검색어 처리 함수
  const handleSearch = (term) => {
    console.log("검색어:", term);
    window.open(term);
    // 여기에 검색어를 처리하는 로직을 추가
  };




  return (
    <div className="App">
    <Header />
    <div className="Main__container">

        {/* SearchBar 컴포넌트 렌더링 */}
        <div className='Main__SearchBar'>
        <SearchBar onSubmit={handleSearch} />
        </div>
      <Link to={`/summary`}>요약 화면</Link>
      </div>
    </div>
  );
}

export default MainPage;