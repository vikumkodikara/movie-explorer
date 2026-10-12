import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
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
    setFavorites((prev) => {
      const isFav = prev.find((fav) => fav.id === movie.id);
      if (isFav) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
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