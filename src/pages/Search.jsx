import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';

export default function Search() {
  // URL එකේ තියෙන search term එක ලබා ගන්නවා
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
        Search Results for "{query}"
      </Typography>
      
      {loading ? (
        <Typography variant="h6" sx={{ color: 'gray', textAlign: 'center' }}>Loading...</Typography>
      ) : movies.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={{
                id: movie.id,
                title: movie.title,
                description: movie.overview, 
                image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/200"
              }} 
            />
          ))}
        </div>
      ) : (
        <Typography variant="h6" sx={{ color: 'gray', textAlign: 'center' }}>No movies found.</Typography>
      )}
    </Box>
  );
}