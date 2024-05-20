import '../App.css';
import "../component/SearchBar.module.css";
import "./MainPage.css";

import React from 'react';
import {BrowserRouter, Route, Routes, Link, useNavigate} from "react-router-dom"
import SearchBar from '../component/SearchBar';

import Header from '../component/Header';

function MainPage() {
  // 검색어 처리 함수
  const navigate = useNavigate();
  const handleSearch = (term) => {
    console.log("검색어:", term);
    navigate(term);
  };




  return (
    <div className="App">
    <Header />
    <div className="Main__container">

        {/* SearchBar 컴포넌트 렌더링 */}
        <div className='Main__SearchBar'>
        <SearchBar onSubmit={handleSearch} />
        </div>
      <Link to={`recommend`}>추천 화면</Link>
      <Link to={`/history`}>요약 기록</Link>
      </div>
    </div>
  );
}

export default MainPage;