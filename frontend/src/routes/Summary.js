import React from 'react';
import Header from '../component/Header';
import "./Summary.css";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTube from "react-youtube";

function Summary() {
  return (
    <div className="Summary">
      <Header />
      <div className="summary__container">
        <div className="summary__title">this is title area</div>
        <div className="summary__video">
          <YouTube
            videoId="qePJVJtP5zY" //동영상 주소
            opts={{
              width: "100%",
              height: "280px",
              playerVars: {
                autoplay: 1, //자동 재생 여부 
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                playlist: "qePJVJtP5zY", //반복 재생으로 재생할 플레이 리스트
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}/>
        </div>
        <div className="summary__contents__container">
          <div className="summary__contents__container__name">요 약</div>
          <div className="summary__contents__container__content">요약내용</div>
        </div>
        <div className='summary__recommend'>
          <div className='summary__recommend__name'>맞춤 추천</div>
          <div className="summary__recommend__contents">
            <img className="summary__recommend__contents__video"src='https://img.youtube.com/vi/qePJVJtP5zY/mqdefault.jpg' width="180px"></img>
            <div className='summary__recommend__contents__title'>영상 제목</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;