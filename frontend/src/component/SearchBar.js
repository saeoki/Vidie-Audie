import React, { useState } from 'react';
import styles from "./SearchBar.module.css";

const SearchBar = ({ onUrlChange }) => {
  const [term, setTerm] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    const videoIdFromURI = term.split('?v=').length > 1 ? term.split('?v=')[1].split('&')[0] : term;
    onUrlChange(videoIdFromURI);
  };

  return (
    <form onSubmit={onFormSubmit} className={styles["search-bar"]}>
      <input
        type="text"
        placeholder="요약할 Youtube URL 붙여넣기"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">요약하기</button>
    </form>
  );
};

export default SearchBar;
