import './App.css';
import "./component/SearchBar.module.css";

import React from 'react';
import SearchBar from './component/SearchBar';
import logo from './images/logo.png';
import SideBar from './images/SideBar-Button.png';
import SideBar2 from './component/SideBar2';

function App() {
  // 검색어 처리 함수
  const handleSearch = (term) => {
    console.log("검색어:", term);
    window.open(term);
    // 여기에 검색어를 처리하는 로직을 추가
  };

  const handleLogin = () => {
    console.log("로그인 클릭");
    window.open("https://developers.kakao.com/product/kakaoLogin");
  };


  return (
    <div className="App">
      <div className='TopHeader'>
        <SideBar2 />
        <button className='SideBar'>
          <img className="SideBar-Image" width="40px" height="40px" src={SideBar} alt="사이드바" />
        </button>
        
        
        <img width="200px" height="35px" src={logo} alt="로고"/>
        <button className='log-in' onClick={handleLogin}>Log in</button>
      </div>


      <header>
        {/* SearchBar 컴포넌트 렌더링 */}
        <SearchBar onSubmit={handleSearch} />
      </header>
    </div>
  );
}

export default App;
