import '../App.css';
import "../component/SearchBar.module.css";

import React from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import SearchBar from '../component/SearchBar';
import logo from '../images/logo.png';
import SideBar from '../images/SideBar-Button.png';
import SideBar2 from '../component/SideBar2';
import Summary from './Summary';
import LoginBtn from '../component/LoginBtn';

function MainPage() {
  // 검색어 처리 함수
  const handleSearch = (term) => {
    console.log("검색어:", term);
    window.open(term);
    // 여기에 검색어를 처리하는 로직을 추가
  };




  return (
    <div className="App">
      <div className='TopHeader'>
        <SideBar2 />
        <button className='SideBar'>
          <img className="SideBar-Image" width="40px" height="40px" src={SideBar} alt="사이드바" />
        </button>
        
        
        <img width="200px" height="35px" src={logo} alt="로고"/>
        <LoginBtn />
      </div>


      <header>
        {/* SearchBar 컴포넌트 렌더링 */}
        <SearchBar onSubmit={handleSearch} />
      </header>
      
      <Link to={`/summary`}>요약 화면</Link>
    </div>
  );
}

export default MainPage;