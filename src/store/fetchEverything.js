import { newsActions } from "./slices/newsSlice";
import { getStoriesIds, getData } from "../services/apiForHN";

export const fetchNews = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(newsActions.resetNews());

      const newsIds = await getStoriesIds();
      const newsIdsSlice = newsIds.slice(0, 100);
      const data = await Promise.all(newsIdsSlice.map((id) => getData(id)));
      dispatch(newsActions.loadStories(data));
    } catch (error) {
      dispatch(newsActions.resetLoadingState("STORIES_LOADING_FAIL"));
    }
  };
};

export const fetchStory = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(newsActions.resetArticle());

      const data = await getData(id);
      dispatch(newsActions.loadArticle(data));
    } catch (error) {
      dispatch(newsActions.resetLoadingState("ARTICLE_LOADING_FAIL"));
    }
  };
};

export const fetchComments = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(newsActions.resetComments());

      const kidsIds = getState().news.article.kids;
      const data = await Promise.all(kidsIds.map((id) => getData(id)));
      dispatch(newsActions.loadComments(data));
    } catch (error) {
      dispatch(newsActions.resetLoadingState("COMMENTS_LOADING_FAIL"));
    }
  };
};

export const fetchSubComments = (kidsIds) => {
  return async (dispatch, getState) => {
    try {
      const data = await Promise.all(kidsIds.map((id) => getData(id)));
      data.forEach((item) => dispatch(newsActions.loadSubComments(item)));
    } catch (error) {
      dispatch(newsActions.resetLoadingState("COMMENTS_LOADING_FAIL"));
    }
  };
};
