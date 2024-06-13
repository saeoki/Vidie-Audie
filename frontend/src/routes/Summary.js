import React ,{useEffect,useState}from "react";
import { useParams } from "react-router-dom";
import "./Summary.css";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTube from "react-youtube";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Summary() {
  const { vid } = useParams();
  const [title, setTitle] = useState('');
  const [videos, setvideos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const videoUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${vid}`);
        const response = await axios.get(`${apiUrl}/video_title/${videoUrl}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        });
        console.log(response)
        setTitle(response.data.title);
        console.log(title)
      } catch (e) {
        console.error("Error fetching title:", e);
      }
    };
    fetchTitle();
  }, [vid]);

//api로부터 데이터 가져오기 -> videos
useEffect(() => {
  const fetchVideos = async () => {
    var optionParams={
      q:"",
      part:"snippet",
      key:"AIzaSyBglDCxMV_AFedYSCM582trb08sqtnuteA",
      type:"video",
      maxResults:2
  };
  //keyword 가져오기
    try {
        const keywordRes = await axios.get(`${apiUrl}/video/${vid}/keywords`);
        console.log("url: ",`${apiUrl}/video/${vid}/keywords`);
        console.log("keywordres:",keywordRes);
        optionParams.q = keywordRes.data;
    } catch (e) {
        setError(e);
    }
    //youtube api URL만들기
    var url="https://www.googleapis.com/youtube/v3/search?";
    for(var option in optionParams){
      url+=option+"="+optionParams[option]+"&";
    }
    url=url.substr(0, url.length-1)
      setLoading(true);
      try {
          const res = await axios.get(url);
          setvideos(res.data);
      } catch (e) {
          setError(e);
      }
      setLoading(false);
  };
  fetchVideos();
}, []);

  return (
    <div className="Summary">
      <div className="summary__container"> 
        <div className="summary__title">{title}</div>
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
            </div>))}
        </div>
      </div>
    </div>
  );
}

export default Summary;