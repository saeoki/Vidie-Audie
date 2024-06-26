import React, { useState } from 'react';
import styles from "./TitleInputBar.module.css";

const TitleInputBar = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["search-bar"]} >
      <input
        type="text"
        placeholder="요약본의 제목을 작성하고 오른쪽 버튼 클릭해주세요!"
        value={title}
        onChange={handleChange}
      />
      <button type="submit">제목 넣기</button>
    </form>
  );
};

export default TitleInputBar;
