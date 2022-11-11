// import { fetchPaginate } from "fetch-paginate";
const urlForHN = "https://hacker-news.firebaseio.com/v0/";
const newStoriesUrl = `${urlForHN}newstories.json?print=pretty`;

const response = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
};

export const getStoriesIds = async () => {
  return fetch(newStoriesUrl).then(response);
};

export const getData = (id) => {
  return fetch(`${urlForHN}/item/${id}.json`).then(response);
};
