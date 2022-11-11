import React from "react";
import catsImage from "../../img/loading.png";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <p>Loading</p>
      <img className={styles.image} src={catsImage} alt="loading" />
    </div>
  );
};

export default Loading;
