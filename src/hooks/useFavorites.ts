import { useState, useEffect, useCallback, useRef } from 'react';
import { Movie } from '@/services/api';

const FAVORITES_KEY = 'movie_explorer_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
      }
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((movie: Movie) => {  
    const stored = localStorage.getItem(FAVORITES_KEY);
      if(stored){
        try {
          setFavorites([...JSON.parse(stored), movie]);
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      }
  }, []);

  const removeFavorite = useCallback((movieId: number) => {
    const stored = localStorage.getItem(FAVORITES_KEY);
      if(stored){
        try {
          setFavorites(JSON.parse(stored).filter((m: Movie) => m.id !== movieId));
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      }
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((m) => m.id === movieId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
