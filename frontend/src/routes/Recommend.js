import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Recommend.css";
import NeedLogin from '../component/NeedLogin';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Recommend ({userInfo}) {
    const[keyword,setKeyword] = useState();
    const[keywordCnt, setKeywordCnt] = useState();
    const [videos, setvideos] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {uid} = useParams();
    
    const nickname = userInfo?.properties?.nickname || '이름';

    /*var optionParams={
        q:"",
        part:"snippet",
        key:"AIzaSyBglDCxMV_AFedYSCM582trb08sqtnuteA",
        type:"video",
        maxResults:2
    };
    var url="https://www.googleapis.com/youtube/v3/search?";
    for(var option in optionParams){
     url+=option+"="+optionParams[option]+"&";
    }
    url=url.substr(0, url.length-1);
*/
    useEffect(()=> {
        const fetchVideos = async () => {
          //top keyword 가져오기
            try {
                const topkeywordRes = await axios.get(`${apiUrl}/user/${userInfo.id}/top_keywords`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'ngrok-skip-browser-warning': '69420'
                    }
                  });
                console.log(topkeywordRes)
                console.log("reskeyword:",topkeywordRes.data[0].count);
                setKeyword(topkeywordRes.data);
                console.log("Keywords: ",keyword)
                //setKeywordCnt([{"q":topkeywordRes.data[0].count},{"q":topkeywordRes.data[1].count}])
                //console.log("keyword count: ",keywordCnt)
            } catch (e) {
                setError(e);
            }
            
        }
        fetchVideos();
    }, [])
//설정한 키워드를 useEffect로 가져옴

useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const videoData = [];
                for (const key of keyword) {
                    var optionParams={
                        q:key.keyword,
                        part:"snippet",
                        key:"AIzaSyDxx65HnfkOWNWlfuxt8-hF3VgQk80LPx4",
                        type:"video",
                        maxResults:2
                    };
                    var url="https://www.googleapis.com/youtube/v3/search?";
                    for(var option in optionParams){
                     url+=option+"="+optionParams[option]+"&";
                    }
                    url=url.slice(0, -1);
                    const response = await axios.get(url);
                    console.log("url:"+url)
                    console.log("res:" + response.data.items);
                    videoData.push(...response.data.items);
                    console.log("videodata: "+JSON.stringify(videoData));
                }
                setvideos(videoData);
                console.log("videos: "+videos)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchVideos();
    }, [keyword])
// useEffect(()=> {
//     setvideos([])
// })
if(!userInfo) {
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
} else{
    return(
        <div>
            <div className='recommend'>
                <div className='recommend__analyze'>
                    <div className='recommend__analyze__text'>{nickname} 님은</div>
                    
                    { keyword && keyword.map((item, index) => (
                        <div>
                        <div className='recommend__analyze__text' key={index}>{item.keyword} 키워드 {item.count}회</div>
                    </div>
                    ))
                    }
                    <div className='recommend__analyze__text'>요약했습니다</div>
                </div>
                <div className='recommend__container'>
                    <div className='recommend__container__nameplate'>추천 영상</div>
                    <div className='recommend__container__videosBox'>
                            {videos && videos.map((video) => (
                                <div className="recommend__container__videosBox__video">
                                    <div className="history__list__content">
                                    <a className="summary__recommend__contents__linkA" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">
                                        <img className="summary__recommend__contents__video"src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`} width="180px"></img>
                                        <div className='summary__recommend__contents__videoName'>{video.snippet.title}</div>
                                    </a>
                                </div>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Recommend;
