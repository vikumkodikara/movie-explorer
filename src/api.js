import axios from 'axios';

const tmdbApi = axios.create({
    baseURL : 'https://api.themoviedb.org/3',
    headers : {
         accept : 'application/json',
         authorization:'Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}'
    }
});
export default tmdbApi;