// Sidebar.js
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import styles from './SideBar2.module.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.active : ''}`}>
      <FaBars className={styles['sidebar-toggle']} onClick={toggleSidebar} />
      <CSSTransition in={showSidebar} timeout={300} classNames="sidebar-transition" unmountOnExit>
        <div className={styles['sidebar-content']}>
          {/* 사이드바 내용 */}
          <ul>
            <li>사용자 정보</li>
            <li>맞춤 추천</li>
            <li>요약 기록</li>
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
