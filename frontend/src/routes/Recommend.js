import React, {useState, useEffect} from 'react';
import Header from '../component/Header';
import "./Recommend.css";

function Recommend () {
    const[video,setVideo] = useState([]);
    useEffect(() => {
        setVideo([{"id":"h8TLXfcqP_s"},{"id":"wursWCYQ-y8"},{"id":"kZz5BqihN5Y"}])
    })
    return(
        <div>
            <Header/>
            <div className='recommend'>
                <div className='recommend__analyze'>
                    <div className='recommend__analyze__text'>user님은</div>
                    <div className='recommend__analyze__text'>OO 키워드 N회</div>
                    <div className='recommend__analyze__text'>OO 키워드 N회</div>
                    <div className='recommend__analyze__text'>요약했습니다</div>
                </div>
                <div className='recommend__container'>
                    <div className='recommend__container__nameplate'>추천 영상</div>
                    <div className='recommend__container__videosBox'>
                
                {video.map(video => (
                <div className="recommend__container__videosBox__video">
                    <div>
                        <div className="history__list__content">
                        <img className="summary__recommend__contents__video"src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} width="180px"></img>
                        <div className='recommend__container__videosBox__videoName'>유튜브 제목</div>
                        </div>
                    </div>
                </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recommend;