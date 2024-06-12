import '../App.css';
import "../component/SearchBar.module.css";
import "./MainPage.css";

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import SearchBar from '../component/SearchBar';
import TitleInputBar from '../component/TitleInputBar';

function MainPage({ userInfo }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!url || !title) {
      alert("URL과 제목을 모두 입력해주세요.");
      return;
    }

    const videoIdFromURI = url.split('?v=').length > 1 ? url.split('?v=')[1].split('&')[0] : url;

    // URL과 제목을 데이터베이스에 저장
    if (userInfo) {
      try {
        console.log(`Saving record for user ${userInfo.id}: URL=${videoIdFromURI}, Title=${title}`);
        await axios.post(`http://localhost:5000/user/${userInfo.id}/add_record`, {
          url: videoIdFromURI,
          title: title
        });
        console.log("Record saved successfully");
      } catch (error) {
        console.error("Error saving record:", error);
      }
    }

    // Summary 페이지로 이동
    navigate(`/summary/${encodeURIComponent(videoIdFromURI)}`);
  };

  return (
    <div className="App">
      <div className="Main__container">
        <div className='Main__SearchBar'>
          <SearchBar onSubmit={setUrl} />
          <TitleInputBar onSubmit={setTitle} />
        </div>
        <button className="Main__searchBar__btn" onClick={handleSearch}>요약하기</button>

      {userInfo ? <div><Link to={`recommend/${userInfo.id }`}>추천 화면</Link>
      <Link to={`/history/${userInfo.id}`}>요약 기록</Link> </div>: null}
      </div>
    </div>
  );
}

export default MainPage;
