  
import React, { useState } from 'react';
import style from './SideBar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <div className={`${style.sidebar} ${isOpen ? 'open' : ''}`}>
      <button className={style.toggle-button} onClick={toggleSidebar}>
        Sidebar
      </button>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
