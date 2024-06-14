import '../App.css';
import "../component/SearchBar.module.css";
import "./MainPage.css";

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import SearchBar from '../component/SearchBar';
import TitleInputBar from '../component/TitleInputBar';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function MainPage({ userInfo }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = async () => {
    if (!url || !title) {
      alert("URL과 제목을 모두 입력해주세요.");
      return;
    }

    // const videoIdFromURI = url.split('?v=').length > 1 ? url.split('?v=')[1].split('&')[0] : url.split('?')[0].replace('https://youtu.be/', '');
    const videoIdFromURI = url.split('?v=').length > 1 ? url.split('?v=')[1].split('&')[0] : url;
    let summary;
    let keyword;
    try{
      const response = await axios.post(`${apiUrl}/MainPage`, {
        url: url,
        title: title
      });

      ({ keyword, summary } = response.data);

      console.log('Success: ', response.data);
    } catch (error) {
      console.error('Error: ', error)
    }


    // URL과 제목, 서버로 부터 받은 keyword와 summary를 데이터베이스에 저장
    if (userInfo) {
      try {
        console.log(`Saving record for user ${userInfo.id}: URL=${url}, Title=${title}, Summary=${summary}, Keyword=${keyword}`);
        await axios.post(`${apiUrl}/user/${userInfo.id}/add_record`, {
          url: url,
          title: title,
          keyword: keyword,
          summary: summary
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

      {userInfo ? <div className='recommendLink'><Link to={`recommend/${userInfo.id }`}>추천 화면</Link></div>: null}
      </div>
    </div>
  );
}

export default MainPage;
