import '../App.css';
import "../component/SearchBar.module.css";
import "./MainPage.css";
import "./MainPage.css";

import React, { useEffect } from 'react';
import {Link} from "react-router-dom"

import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"

import SearchBar from '../component/SearchBar';

import Header from '../component/Header';

function MainPage({userInfo}) {
  // 검색어 처리 함수
  const navigate = useNavigate();
  const handleSearch = (term) => {
    console.log("검색어:", term);
    navigate(term);
  };




  return (
    <div className="App">

    <div className="Main__container">

        {/* SearchBar 컴포넌트 렌더링 */}
        <div className='Main__SearchBar'>
        <SearchBar onSubmit={handleSearch} />
        </div>
          { userInfo != null ?
            <div><Link to={`/recommend/${userInfo.id}`}>추천 화면</Link>
            <Link to={`/history/${userInfo.id}`}>요약 기록</Link></div>
            : null
          }
      
      </div>
    </div>
  );
}

export default MainPage;