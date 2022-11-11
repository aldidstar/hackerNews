import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Comment.module.css";
import { fetchSubComments } from "../../store/fetchEverything";
import CommentsList from "../../components/CommentList/CommentsList";

const Comment = ({ item }) => {
  const { by, id, kids, text, time, dead, deleted } = item;
  const date = new Date(time * 1000).toLocaleString();

  const dispatch = useDispatch();
  const subComments = useSelector((state) => state.news.subComments);

  const [subCommentsIsVisible, setSubCommentsIsVisible] = useState(false);

  useEffect(() => {
    if (kids) {
      dispatch(fetchSubComments(kids));
    }
  }, [dispatch, kids]);

  const showSubComments = () => {
    setSubCommentsIsVisible(!subCommentsIsVisible);
  };

  const filtredSubComments = subComments.filter((item) => item.parent === id);

  const commentDead = dead ? (
    <p className={styles.commentDead}>No Comment</p>
  ) : null;

  const commentDeleted = deleted ? (
    <p className={styles.commentDead}>Comment Deleted</p>
  ) : null;

  const showSubCommentsClass = subCommentsIsVisible
    ? styles.subCommentsVisible
    : styles.subCommentsHidden;

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.commentInnerContainer}>
          <span className={styles.commentAuthor}>{by}</span>
          <p>Published: {date}</p>
        </div>

        {text && (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}

        {commentDead}

        {commentDeleted}

        {kids && (
          <button className={styles.button} onClick={showSubComments}>
            <p className={styles.buttonText}>
              {subCommentsIsVisible ? "Закрыть ветку" : "Раскрыть ветку"}
            </p>
          </button>
        )}
      </div>

      {kids && (
        <div className={showSubCommentsClass}>
          <CommentsList comments={filtredSubComments} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Comment;
