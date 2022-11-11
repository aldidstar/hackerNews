import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./CommentPage.module.css";
import Article from "../../components/Article/Article";
import CommentsList from "../../components/CommentList/CommentsList";
import Loading from "../../components/Loading/Loading";

import { newsActions } from "../../store/slices/newsSlice";
import { fetchStory, fetchComments } from "../../store/fetchEverything";

const CommentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const articleIsLoading = useSelector((state) => state.news.articleIsLoading);
  const stories = useSelector((state) => state.news.stories);
  const findStory = stories.find((item) => item.id === Number(id));

  const article = useSelector((state) => state.news.article);
  const comments = useSelector((state) => state.news.comments);

  const commentsAreLoading = useSelector(
    (state) => state.news.commentsAreLoading
  );

  const loadComments = useCallback(() => {
    if (article !== null && article.kids) {
      dispatch(fetchComments());
    }
  }, [dispatch, article]);

  useEffect(() => {
    if (findStory) {
      dispatch(newsActions.loadArticle(findStory));
    } else {
      dispatch(fetchStory(id));
    }
  }, [findStory, dispatch, id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadComments();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadComments]);

  return (
    <React.Fragment>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          Back
        </button>
      </header>

      <main className={styles.container}>
        {article !== null && (
          <section>
            {articleIsLoading ? <Loading /> : <Article {...article} />}
          </section>
        )}

        {article !== null && article.kids && (
          <>
            <button onClick={loadComments} className={styles.btn}>
              Update Comment
            </button>
            <section>
              {commentsAreLoading ? (
                <Loading />
              ) : (
                <CommentsList comments={comments} />
              )}
            </section>
          </>
        )}
      </main>
    </React.Fragment>
  );
};

export default CommentPage;
