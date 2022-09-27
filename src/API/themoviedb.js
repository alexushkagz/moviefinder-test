import axios from 'axios';

const API_KEY = 'b779846d368b418c0e01a3215cf2d1ab';
const API_URL = 'https://api.themoviedb.org/3';
const IMAGES_PATH = 'https://image.tmdb.org/t/p/w154'; // w92, w154, w185, w300

/**
 * 
 * @param {Object} params A key-value pairs for query parameters
 * @returns A URL query string
 */
/* function createQueryString(params) {
    let query = new URLSearchParams([ ['api_key', API_KEY], ...Object.entries(params) ]);
    return query.toString();
} */

/**
 * 
 * @param {String} path An API path
 * @param {Object} params A key-value pairs for query parameters
 * @returns A full API URL
 */
/* function createAPIRequestString(path, params) {
    let url = new URL(API_URL + path);
    let query = createQueryString(params);
    url.search = query;
    return url.toString();
} */

export default class APIService {
    static async fetch(path, params={}) {
        const url = new URL(API_URL + path).toString();
        const response = await axios.get(url, {
            params: {
                api_key: API_KEY,
                ...params
            }
        })
        return response;
    }

    static getPoster(movie) {
        return IMAGES_PATH + movie.poster_path;
    }

    // static async getMovies() {
    //     const response = await this.fetch('/discover/movie');
    //     return response;
    // }

    static async getPopularMovies() {
        let params = {
			// sort_by: 'vote_average.desc',
			sort_by: 'popularity.desc',
		};
        const response = await this.fetch('/discover/movie', params);
        return response;
    }

    static async searchMovies(query) {
        let params = {
			query,
		};
        const response = await this.fetch('/search/movie', params);
        return response;
    }

    static async getGenres() {
        const response = await this.fetch('/genre/movie/list');
        return response;
    }

    static async getMoviesFiltered(filters, page) {
        // let params = {
        //     sort_by: filters.sortBy,
        //     with_genres: filters.genre,
        //     year: filters.year,
        //     primary_release_year: filters.year,
		// };
        let params = {}
        if (filters.sortBy) params.sort_by = filters.sortBy;
        if (filters.genre) params.with_genres = filters.genre;
        if (filters.year) params.primary_release_year = filters.year;
        params.page = page;

        const response = await this.fetch('/discover/movie', params);
        return response;
    }
}