import React ,{useEffect,useState}from "react";
import { useParams } from "react-router-dom";
import "./Summary.css";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTube from "react-youtube";
import axios from "axios";

function Summary() {
  const { vid } = useParams();
  const [title, setTitle] = useState('');
  const [videos, setvideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  var optionParams={
    q:"랄로",
    part:"snippet",
    key:"AIzaSyBglDCxMV_AFedYSCM582trb08sqtnuteA",
    type:"video",
    maxResults:2
};
  //youtube api URL만들기
  var url="https://www.googleapis.com/youtube/v3/search?";
  for(var option in optionParams){
    url+=option+"="+optionParams[option]+"&";
  }

  url=url.substr(0, url.length-1)

//api로부터 데이터 가져오기 -> videos
useEffect(() => {
  const fetchVideos = async () => {
  
    url=url.substr(0, url.length-1)
      setLoading(true);
      try {
          const res = await axios.get(url);
          setvideos(res.data);
          console.log(videos)
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };
  fetchVideos();
}, []);
  useEffect(() => {
    // 데이터베이스에서 제목을 가져오는 API 호출
    const fetchTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_record_title/${vid}`);
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching title:", error);
      }
    };
    fetchTitle();
  }, [vid]);



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
          <a className="summary__recommend__contents__linkA" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">
            <img className="summary__recommend__contents__video"src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`} width="180px"></img>
            <div className='summary__recommend__contents__title'>{video.snippet.title}</div>
            </a>
            </div>))};
        </div>
      </div>
    </div>
  );
}

export default Summary;
