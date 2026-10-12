import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setError(null);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}&page=${page}`
        );
        
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data. Please try again later.");
        }
        
        const data = await response.json();
        
        setMovies((prevMovies) => {
          if (page === 1) return data.results;
          return [...prevMovies, ...data.results];
        });
        
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box sx={{ padding: '20px', minHeight: '80vh' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
        Search Results for "{query}"
      </Typography>
      
      {error && (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      )}

      {!error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!error && movies.length === 0 && !loading && (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No movies found. Try searching for something else!
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        {loading && <CircularProgress />}
        {!loading && page < totalPages && !error && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoadMore}
            sx={{ px: 4, py: 1, fontSize: '16px' }}
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
}