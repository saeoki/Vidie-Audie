import React, { useEffect, useState } from 'react';
import style from './AccordianMenu.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccordianMenu = ({ userInfo }) => {
  const [records, setRecords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      console.log("User Info:", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      axios.get(`http://localhost:5000/user/${userInfo.id}/records`)
        .then(response => {
          console.log("Fetched records: ", response.data);
          setRecords(response.data || []);
        })
        .catch(error => {
          console.error("Error fetching records:", error);
          setRecords([]);  // Error가 발생해도 빈 배열로 설정
        });
    }
  }, [userInfo]);

  const handleRecordClick = (videoUrl) => {
    navigate(`/summary/${encodeURIComponent(videoUrl)}`);
  };

  const MENU_LIST = [
    { title: '사용자 정보', list: [userInfo?.kakao_account?.profile?.nickname || '이름'], key: 'user-info' },
    { title: '맞춤 추천', list: ['추천내용1', '추천내용2', '추천내용3', '추천내용4'], key: 'recommendations' },
    {
      title: '요약 기록',
      list: (userInfo && records.length > 0)
        ? records.map((record, idx) => {
            const title = record[2]?.length > 4 ? `${record[2].substring(0, 4)}...` : record[2];
            const videoUrl = record[1];
            return { title, videoUrl, key: `record-${idx}` };
          })
        : [{ title: '기록이 없습니다.', videoUrl: '', key: 'no-records' }],
      key: 'summary-records'
    },
  ];

  const Nav = ({ children }) => {
    return <nav>{children}</nav>;
  };

  const TitleWrapper = ({ children }) => {
    return <div>{children}</div>;
  };

  const Title = ({ children }) => {
    return <h1>{children}</h1>;
  };

  const Ul = ({ children }) => {
    return <ul>{children}</ul>;
  };

  const ListItem = ({ title, idx, list = [], isActive, setActiveIndex }) => {
    const handleClick = () => {
      setActiveIndex(isActive ? null : idx);
    };

    return (
      <li key={`listitem-${idx}`}>
        <button className={style.button} onClick={handleClick}>{title}</button>
        {isActive && (
          <ul className={style.slideDown}>
            {list.map((item) => (
              <li
                className={style.liActive}
                key={item.key}
                onClick={() => idx === 2 ? handleRecordClick(item.videoUrl) : null}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Nav>
      <TitleWrapper>
        <Title></Title>
      </TitleWrapper>
      <Ul>
        {userInfo ? (
          MENU_LIST.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <ListItem
                title={item.title}
                idx={idx}
                list={item.list}
                isActive={isActive}
                setActiveIndex={setActiveIndex}
                key={item.key}
              />
            );
          })
        ) : null}
      </Ul>
    </Nav>
  );
};

export default AccordianMenu;
