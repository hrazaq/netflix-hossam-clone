import axios from "axios";

/* base url to make requets to the movie database TMDB */

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;