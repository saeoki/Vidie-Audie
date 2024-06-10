import React from "react";
import { useParams } from "react-router-dom";
import "./Summary.css";
import YouTube from "react-youtube";
import axios from 'axios';
import "./Recommend.css"

function Summary() {
  const { vid } = useParams();

  return (
    <div className="Summary">
      <div className="summary__container">
        <div className="summary__title">
      </div>
        <div className="summary__video">
          <YouTube
            videoId={vid} //동영상 주소
            opts={{
              width: "100%",
              height: "280px",
              playerVars: {
                autoplay: 1, //자동 재생 여부 
                modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
              },
            }}
            onReady={(e) => {
              e.target.mute(); //소리 끔
            }}
          />
        </div>
        <div className="summary__contents__container">
          <div className="summary__contents__container__name">요 약</div>
          <div className="summary__contents__container__content">요약내용</div>
        </div>
        <div className='summary__recommend'>
          <div className='summary__recommend__name'>맞춤 추천</div>

          {videos && videos.items.map((video) =>(
          <div className="summary__recommend__contents">
            <img className="summary__recommend__contents__video" src='https://img.youtube.com/vi/qePJVJtP5zY/mqdefault.jpg' width="180px" alt="추천 영상" />
            <div className='summary__recommend__contents__title'>영상 제목</div>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Summary;
