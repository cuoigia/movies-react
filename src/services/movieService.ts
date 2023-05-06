import axios from "axios";
const MOVIES_API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const BASE_MOVIE_URL = process.env.REACT_APP_BASE_MOVIE_URL;

export interface Movie {
  adult: Boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: Boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovies = async (
  searchTerm?: string
): Promise<Movie[]> => {
  const url = `${BASE_MOVIE_URL}/search/movie?api_key=${MOVIES_API_KEY}&language=en-US&page=1`;
  try {
    if (searchTerm) {
      const response = await axios.get(url, { params: { query: searchTerm } });
      return response.data.results;
    } else {
      const response = await axios.get(url);
      return response.data.results;
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};

export const getNowPlayingMovies = async (
  searchTerm?: string
): Promise<Movie[]> => {
  const url = `${BASE_MOVIE_URL}/movie/now_playing?api_key=${MOVIES_API_KEY}&language=en-US&page=1`;
  try {
    if (searchTerm) {
      const response = await axios.get(url, { params: { query: searchTerm } });
      return response.data.results;
    } else {
      const response = await axios.get(url);
      return response.data.results;
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};

export const getTopRatedMovies = async (
  searchTerm?: string
): Promise<Movie[]> => {
  const url = `${BASE_MOVIE_URL}/movie/top_rated?api_key=${MOVIES_API_KEY}&language=en-US&page=1`;
  try {
    if (searchTerm) {
      return axios
        .get(url, { params: { query: searchTerm } })
        .then((response) => response.data.results);
    } else {
      return axios.get(url).then((response) => response.data.results);
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};

export const getMovieDetails = async (
  movieId: number | string
): Promise<Movie> => {
  const url = `${BASE_MOVIE_URL}/movie/${movieId}?api_key=${MOVIES_API_KEY}&language=en-US`;
  try {
    return axios.get(url).then((response) => response.data);
  } catch (error) {
    console.error("Error fetching now playing details:", error);
    return {
      adult: false,
      backdrop_path: "",
      genre_ids: [],
      id: 0,
      original_language: "",
      original_title: "",
      overview: "",
      popularity: 0,
      poster_path: "",
      release_date: "",
      title: "",
      video: false,
      vote_average: 0,
      vote_count: 0,
    };
  }
};
