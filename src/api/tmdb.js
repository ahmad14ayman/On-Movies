import axios from 'axios';

const API_KEY = '530297e006db0d47e04dc323f6ce30d7';
const BASE_URL = 'https://api.themoviedb.org/3';


const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export const fetchPopularMovies = (page = 1) =>
    tmdb.get('/movie/popular', { params: { page } });

export const searchMovies = (query, page = 1) =>
    tmdb.get('/search/movie', { params: { query, page, include_adult: false } });

export const fetchMovieDetails = (movieId) =>
    tmdb.get(`/movie/${movieId}`, { params: { append_to_response: 'videos,images' } });

export const fetchGenres = () => tmdb.get('/genre/movie/list');

export default tmdb;
