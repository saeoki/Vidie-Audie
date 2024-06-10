import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import styles from './SideBar2.module.css';
import AccordianMenu from './AccordianMenu';

const Sidebar = ({ userInfo }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`${styles.sidebar} ${showSidebar ? styles.active : ''}`}>
      <FaBars className={styles['sidebar-toggle']} onClick={toggleSidebar} />
      <CSSTransition in={showSidebar} timeout={300} classNames="sidebar-transition" unmountOnExit>
        <div className={styles['sidebar-content']}>
          <ul>
            <AccordianMenu userInfo={userInfo} />
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
