import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={{
            id: movie.id,
            title: movie.title,
            description: movie.overview, 
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
          }} 
        />
      ))}
    </div>
  );
}