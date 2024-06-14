import React ,{useEffect,useState}from "react";
import { useParams } from "react-router-dom";
import "./Summary.css";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import YouTube from "react-youtube";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const youtubeAPI = process.env.REACT_APP_YOUTUBE_API;

function Summary() {
  const { vid } = useParams();
  const [title, setTitle] = useState('');
  const [videos, setvideos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryContent, setSummaryContent] = useState();
  const videoUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${vid}`);

  useEffect(() => {
    const fetchTitle = async () => {
      //타이틀 가져오기
      try {
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
      try {
        //요약 내용 가져오기
        const response = await axios.get(`${apiUrl}/summary/${videoUrl}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        });
        setSummaryContent(response.data.summary);
        console.log(summaryContent);
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
      key:youtubeAPI,
      type:"video",
      maxResults:2
  };
  //keyword 가져오기
    try {
      const keywordResponse = await axios.get(`${apiUrl}/video/${videoUrl}/keywords`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      });
        console.log("keywordres:",keywordResponse);
        optionParams.q = keywordResponse.data[0];
        console.log(optionParams.q)
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
    console.log(youtubeAPI)
    //youtube 목록 가져요기
      try {
        url=url.replace(/(\s*)/g, "");
        console.log("url: ", url)
          const res = await axios.get(url);
          console.log(res)
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
          <div className="summary__contents__container__content">{summaryContent}</div>
        </div>
        <div className='summary__recommend'>
          <div className='summary__recommend__name'>맞춤 추천</div>

          {videos && videos.items.map((video,index) =>(
          <div className="summary__recommend__contents" key={index}>
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