import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem('favorites');
      const parsed = localData ? JSON.parse(localData) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  const toggleFavorite = (movie) => {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const isFav = list.find((fav) => fav?.id === movie.id);
      if (isFav) {
        return list.filter((fav) => fav?.id !== movie.id);
      } else {
        return [...list, movie];
      }
    });
  };

  const updateLastSearch = (query) => {
    setLastSearch(query);
  };

  return (
    <MovieContext.Provider value={{ favorites, toggleFavorite, lastSearch, updateLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};