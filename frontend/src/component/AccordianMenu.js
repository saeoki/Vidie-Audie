import React, { useEffect, useState } from 'react';
import style from './AccordianMenu.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

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
      axios.get(`${apiUrl}/user/${userInfo.id}/records`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      })
        .then(response => {
          console.log("Fetched records: ", response.data);
          if (Array.isArray(response.data)) {
            setRecords(response.data);
          } else {
            console.error("Unexpected response format:", response.data);
            setRecords([]);
          }
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

  const handleRecommendClick = () => {
    const uid = userInfo?.id || 'defaultUID'; // 사용자 정보가 없는 경우를 대비해 기본값을 설정
    navigate(`/recommend/${uid}`);
  };

  const handleUserInfoClick = () => {
    setActiveIndex(activeIndex === 'user-info' ? null : 'user-info');
  };

  const handleLoginClick = () => {
    if (!userInfo) {
      navigate('/loginPage'); // 로그인 페이지로 이동
    }
  };

  const MENU_LIST = [
    { title: '사용자 정보', list: userInfo ? [{ title: userInfo.properties?.nickname || '로그인 해주세요!', key: 'user-info-item' }] : [{ title: '로그인 해주세요!', key: 'login-item' }], key: 'user-info', onClick: handleUserInfoClick },
    { title: '맞춤 추천', list: [], key: 'recommendations', onClick: handleRecommendClick },
    {
      title: '요약 기록',
      list: (userInfo && records.length > 0)
        ? records.map((record, idx) => {
            const title = record[2]?.length > 4 ? `${record[2].substring(0, 4)}...` : record[2];
            const videoUrl = record[1].split('?v=').length > 1 ? record[1].split('?v=')[1].split('&')[0] : record[1];
            return { title, videoUrl, key: `record-${idx}` };
          })
        : [{ title: '기록이 없습니다.', videoUrl: '', key: 'no-records' }],
      key: 'summary-records'
    },
  ];

  const Nav = ({ children }) => <nav>{children}</nav>;
  const TitleWrapper = ({ children }) => <div>{children}</div>;
  const Title = ({ children }) => <h1>{children}</h1>;
  const Ul = ({ children }) => <ul>{children}</ul>;

  const ListItem = ({ title, idx, list = [], isActive, setActiveIndex, onClick }) => {
    const handleClick = () => {
      setActiveIndex(isActive ? null : idx);
      if (onClick) {
        onClick();
      }
    };

    return (
      <li key={`listitem-${idx}`}>
        <button className={style.button} onClick={handleClick}>{title}</button>
        {isActive && (
          <ul className={style.slideDown}>
            {list.map((item, subIdx) => (
              <li
                className={style.liActive}
                key={item.key || `${item.title}-${subIdx}`}
                onClick={() => {
                  if (idx === 'user-info' && item.key === 'login-item') {
                    handleLoginClick();
                  } else if (idx === 'summary-records' && item.videoUrl) {
                    handleRecordClick(item.videoUrl);
                  }
                }}
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
      <TitleWrapper />
      <Ul>
        {MENU_LIST.map((item) => {
          const isActive = activeIndex === item.key;
          return (
            <ListItem
              title={item.title}
              idx={item.key}
              list={item.list}
              isActive={isActive}
              setActiveIndex={setActiveIndex}
              key={item.key || item.title}
              onClick={item.onClick}
            />
          );
        })}
      </Ul>
    </Nav>
  );
};

export default AccordianMenu;
