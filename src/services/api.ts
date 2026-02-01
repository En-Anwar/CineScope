import axios from 'axios';

const API_KEY = '886427b33bd10937fc5f58c9d34e364a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Image URL helpers
export const getImageUrl = (path: string | null, size: 'w200' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Types
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// API Functions
export const getPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  const response = await tmdbApi.get<MoviesResponse>('/movie/popular', {
    params: { page },
  });
  return response.data;
};

export const getTrendingMovies = async (): Promise<MoviesResponse> => {
  const response = await tmdbApi.get<MoviesResponse>('/trending/movie/week');
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await tmdbApi.get<MoviesResponse>('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const response = await tmdbApi.get<Movie>(`/movie/${id}`);
  return response.data;
};

// export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<MoviesResponse> => {
//   const response = await tmdbApi.get<MoviesResponse>('/discover/movie', {
//     params: { with_genres: genreId, page },
//   });
//   return response.data;
// };

// export const getGenres = async (): Promise<Genre[]> => {
//   const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
//   return response.data.genres;
// };

