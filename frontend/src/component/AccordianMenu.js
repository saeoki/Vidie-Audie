import React, { useState, } from 'react';
import style from './AccordianMenu.module.css';
import KakaoLogin from 'react-kakao-login';

const AccordianMenu = ({ userInfo }) => {
  const nickname = userInfo?.properties?.nickname || '이름';
  const email = userInfo?.kakao_account?.email || '이메일';
  const profileImage = userInfo?.properties?.profile_image || '프로필사진';

  const MENU_LIST = [
    { title: '사용자 정보', list: [nickname] },
    { title: '맞춤 추천', list: ['추천내용1', '추천내용2', '추천내용3', '추천내용4'] },
    { title: '요약 기록', list: ['요약기록1', '요약기록2', '요약기록3', '요약기록4'] },
  ];

    // Nav 컴포넌트 정의
  const Nav = ({ children }) => {
    return <nav>{children}</nav>;
  };
  
  // TitleWrapper 컴포넌트 정의
  const TitleWrapper = ({ children }) => {
    return <div>{children}</div>;
  };
  
  // Title 컴포넌트 정의
  const Title = ({ children }) => {
    return <h1>{children}</h1>;
  };
  
  // Ul 컴포넌트 정의
  const Ul = ({ children }) => {
    return <ul>{children}</ul>;
  };

  const liClicked = () => {
    document.getElementsByClassName('style.liActive').classList.add('slideDown');
    alert(document.getElementsByClassName('style.liActive').className);
  };
  
  // ListItem 컴포넌트 정의
  const ListItem = ({ title, idx, list, isActive, activeIndex, setActiveIndex }) => {
    return (
      <li key={idx}>
        <button className={style.button} onClick={() => setActiveIndex(isActive ? undefined : idx)} onclick={liClicked}>{title}</button>
        {isActive && (
          <ul className={style.ul}>
            {list.map((item, index) => (
              <li className={style.liActive} key={index}>{item}</li>
            ))}
          </ul>
        )}
      </li>
    );
  };
  
    const [activeIndex, setActiveIndex,] = useState();
  
    return (
      <Nav>
        <TitleWrapper>
          <Title></Title>
        </TitleWrapper>
        <Ul>
          {MENU_LIST.map((item, idx) => {
            const isActive = idx === activeIndex;
            
            return (
              // ListItem 하나 하나가 <li>
              <ListItem
                title={item.title}
                idx={idx}
                list={item.list}
                isActive={isActive}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            );
          })}
        </Ul>
      </Nav>
    );
  };

export default AccordianMenu;
