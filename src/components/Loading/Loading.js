import React from "react";
import loading from "../../img/loading.png";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div>
      <p>Loading</p>
      <img className={styles.image} src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
