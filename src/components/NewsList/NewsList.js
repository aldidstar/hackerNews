import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./NewsList.module.css";
import NewsCard from "../NewsCard/NewsCard";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination";

const NewsList = () => {
  const storiesAreLoading = useSelector(
    (state) => state.news.storiesAreLoading
  );
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const stories = useSelector((state) => state.news.stories);

  const nextPage = (e) => {
    e.preventDefault();
    setOffset((old) => old + 20);
    setPage((old) => old + 1);
  };
  const prevPage = (e) => {
    e.preventDefault();
    setOffset((old) => old - 20);
    setPage((old) => old - 1);
  };

  let cards = [...stories]
    .sort((a, b) => {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    })
    .slice(offset, offset + limit);

  return (
    <React.Fragment>
      {storiesAreLoading && <Loading />}
      {cards && (
        <>
          <ul className={styles.cardList}>
            {cards.map((story) => (
              <NewsCard key={story.id} {...story} />
            ))}
          </ul>
          <Pagination
            prev={(e) => prevPage(e)}
            next={(e) => nextPage(e)}
            page={page}
            total={5}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default NewsList;
