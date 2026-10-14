import { get } from '../utils/http';

const movieService = {
  getNowPlaying: () => get('/movie/now_playing'),
  getTopRated: () => get('/movie/top_rated'),
  search: (keyword) => get('/search/movie', { query: keyword }),
  getDetail: (id) => get(`/movie/${id}`),
  getRecommendations: (id) => get(`/movie/${id}/recommendations`),
};

export default movieService;
