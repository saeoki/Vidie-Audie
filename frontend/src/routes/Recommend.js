import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Recommend.css";
import NeedLogin from '../component/NeedLogin';

function Recommend ({userInfo}) {
    const[keyword,setKeyword] = useState([]);
    const [videos, setvideos] = useState([{"kind":"youtube#searchResult","etag":"Axp7kVMhibCsKIVKDSgtQJJWsRY","id":{"kind":"youtube#video","videoId":"M6A35kfEQxI"},"snippet":{"publishedAt":"2023-03-31T14:18:08Z","channelId":"UCaNdM2jcA_qXeMmi-a3CObw","title":"릴카 랄로 누군가를 좋아한다는 사실이… #shorts","description":"릴카 랄로 누군가를 좋아한다는 사실이… #shorts.","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/M6A35kfEQxI/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/M6A35kfEQxI/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/M6A35kfEQxI/hqdefault.jpg","width":480,"height":360}},"channelTitle":"김남빈","liveBroadcastContent":"none","publishTime":"2023-03-31T14:18:08Z"}},{"kind":"youtube#searchResult","etag":"1idZoNTfxCxsb_VM9ghi3JG3VfQ","id":{"kind":"youtube#video","videoId":"CMcb1MMfGbE"},"snippet":{"publishedAt":"2024-01-05T14:53:49Z","channelId":"UCpMU2iFYOsk5zMkef6ajJDw","title":"랄로 사랑에 빠지다","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/CMcb1MMfGbE/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/CMcb1MMfGbE/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/CMcb1MMfGbE/hqdefault.jpg","width":480,"height":360}},"channelTitle":"SHORT TUBE","liveBroadcastContent":"none","publishTime":"2024-01-05T14:53:49Z"}},{"kind":"youtube#searchResult","etag":"8aGp9Qx8geCeVrQxAwnsrPPZkzc","id":{"kind":"youtube#video","videoId":"1mbWSUe40iU"},"snippet":{"publishedAt":"2024-05-25T09:02:08Z","channelId":"UC-Zedn7a_RJyb5hUQ-aGZog","title":"악놀 서버에 금지된 용암테러를 당했습니다.","description":"악놀 #악어의놀이터 #악놀2 #조매력 편집 : 핫산 님 썸네일 : 머독 머독 생방송 : https://bj.afreecatv.com/spbabobj 머독 팬카페 ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/1mbWSUe40iU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/1mbWSUe40iU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/1mbWSUe40iU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"머독","liveBroadcastContent":"none","publishTime":"2024-05-25T09:02:08Z"}},{"kind":"youtube#searchResult","etag":"W22WwbcrGcrRpes3ONBZgANfAV0","id":{"kind":"youtube#video","videoId":"MOO21NeKDbU"},"snippet":{"publishedAt":"2024-05-24T09:58:24Z","channelId":"UCmHltryGykfakS-JmaxrNBg","title":"악어의 놀이터에서 머독님을 만났어요","description":"아이네 공식 거시기 채널입니다* 20240521 아이네 생방송: https://bj.afreecatv.com/inehine 아이네 유튜브: ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/MOO21NeKDbU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/MOO21NeKDbU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/MOO21NeKDbU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"데친 숙주나물","liveBroadcastContent":"none","publishTime":"2024-05-24T09:58:24Z"}}]);
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
        setKeyword([{"q":"랄로"},{"q":"머독"}])
        console.log(keyword);
        console.log(userInfo)
        console.log(uid)
    }, [])

//설정한 키워드를 useEffect로 가져옴
/*
useEffect(() => {
        if (keyword.length === 0) return;
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const videoData = [];
                for (const key of keyword) {
                    var optionParams={
                        q:key.q,
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
    */
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
                    <div className='recommend__analyze__text'>OO 키워드 N회</div>
                    <div className='recommend__analyze__text'>OO 키워드 N회</div>
                    <div className='recommend__analyze__text'>요약했습니다</div>
                </div>
                <div className='recommend__container'>
                    <div className='recommend__container__nameplate'>추천 영상</div>
                    <div className='recommend__container__videosBox'>
                            {videos.map((video) => (
                                <div className="recommend__container__videosBox__video">
                                    <div className="history__list__content">
                                    <a className="summary__recommend__contents__linkA" href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">
                                        <img className="summary__recommend__contents__video"src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`} width="180px"></img>
                                        <div className='summary__recommend__contents__title'>{video.snippet.title}</div>
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