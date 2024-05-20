import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import "./History.css";

function History() {
    const[historyList,setHistoryList] = useState([]);
    useEffect(() => {
        setHistoryList([{"date":new Date('2022-03-09 00:00:00')},{"date":new Date('2022-03-10 00:00:00')},{"date":new Date('2022-03-11 00:00:00')}])
    })
    return(
        <div>
            <Header/>
            <div className='history'>
            {historyList.map(historyList => (
            <div className="history__list">
                <div className='history__list__num'>요약기록</div>
                <div className="history__list__date">{historyList.date.toLocaleDateString()}</div>
            </div>))}
            </div>
        </div>
    )
}

export default History;