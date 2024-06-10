import React from 'react';
import "./Summary.css";
import YouTube from "react-youtube";
import { useParams } from 'react-router-dom';
import NeedLogin from '../component/NeedLogin';

function HistoryDetail({userInfo}) {
  const {uid,vid} = useParams();
  if(!vid || vid==="false") {
    return (
      <div className='needLogin'>
          <div className='needLogin__textArea'>
              URL을 다시 한번 확인해주세요!
          </div>
      </div>
    )
  }else if(!userInfo){
    return (
      <NeedLogin/>
    )
  }else if(userInfo.id != uid){
    return (
      <div>
          잘못 된 경로입니다
          로그인 정보를 확인해 주세요.
      </div>
  )
  }else{
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
            }}/>
        </div>
        <div className="summary__contents__container">
          <div className="summary__contents__container__name">요 약</div>
          <div className="summary__contents__container__content">요약내용</div>
        </div>
      </div>
    </div>
  );
}
}

export default HistoryDetail;