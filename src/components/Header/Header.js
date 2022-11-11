import React from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../store/fetchEverything";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const updateNews = () => {
    dispatch(fetchNews());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Hacker News</h1>
      <button onClick={updateNews} className={styles.btn}>
        Update
      </button>
    </header>
  );
};

export default Header;
