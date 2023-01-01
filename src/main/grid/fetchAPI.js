import axios from 'axios';

const apiKey = '2d276089473c47f7ae8f2b5dd0bd3f14'; //для dns321
// const apiKey = 'e2e5a306d6314ec69d1b7aea5a83ce92'; //для nikolai
// const apiKey = '95a6247f19404aee8a4829e51e54ef6c'; //для mukola

const options = {
  headers: {
    'Authorization ': apiKey,
  },
};

const fetchNews = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=css&language=en&pageSize=${pageSize}&page=${page}`,
      options
    );
    if (response.data.articles) {
      const newsList = response.data.articles;
      return newsList;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

export default fetchNews;
