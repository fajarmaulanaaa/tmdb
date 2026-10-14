export const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.themoviedb.org/3';
export const IMG_URL = process.env.REACT_APP_IMG_URL || 'https://image.tmdb.org/t/p/w500';
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const hasApiKey = Boolean(API_KEY);
