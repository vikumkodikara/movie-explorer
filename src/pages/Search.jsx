import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress, Container, Chip } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

export default function Search() {
  const { query } = useParams();
  const navigate = useNavigate();
  const { lastSearch } = useContext(MovieContext);
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
        const apiKey = import.meta.env.VITE_TMDB_API_KEY || "65322f0f7577a0c89e9d24adcd1bd86b";
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
        );
        
        const data = response.data;
        
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
    <Container maxWidth="xl" sx={{ py: 3, minHeight: '80vh' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Search Results for "{query}"
      </Typography>

      {lastSearch && lastSearch.toLowerCase() !== query?.toLowerCase() && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Last Searched:
          </Typography>
          <Chip
            label={lastSearch}
            size="small"
            color="primary"
            variant="outlined"
            clickable
            onClick={() => navigate(`/search/${lastSearch}`)}
          />
        </Box>
      )}
      
      {error && (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      )}

      {!error && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 3,
            justifyItems: 'center',
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
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
    </Container>
  );
}