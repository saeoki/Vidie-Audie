import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import NeedLogin from '../component/NeedLogin';
import "./History.css";
import "./Recommend.css"

function History({userInfo}) {
    const[historyList,setHistoryList] = useState([{"date":new Date('2022-03-09 00:00:00'), "name":"문상훈","uid":userInfo,"vid":"CSFY5UebKu0"},{"date":new Date('2022-03-10 00:00:00'), "name":"여행vlog","uid":userInfo,"vid":"BgTD1HI-3Xw"},{"date":new Date('2022-03-11 00:00:00'), "name":"북한 오물 투척","uid":userInfo,"vid":"Mtli7MLpmVI"}]);
    const {uid} = useParams();
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
            <div className='history'>
            {historyList.map(historyList => (
            <div className="history__list">
                <Link to={`/historyDetail/${userInfo.id}/${historyList.vid}`}>
                <div className='history__list__num'>{historyList.name}</div>
                <div className="history__list__date">{historyList.date.toLocaleDateString()}</div>
                </Link>
            </div>))}
            </div>
        </div>
    )
}
}

export default History;