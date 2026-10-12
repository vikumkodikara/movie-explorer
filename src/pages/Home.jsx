import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, CircularProgress, Chip } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

const genres = [
  { id: null, name: 'All' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 16, name: 'Animation' },
  { id: 10749, name: 'Romance' },
  { id: 53, name: 'Thriller' },
];

export default function Home() {
  const navigate = useNavigate();
  const { lastSearch } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY || "65322f0f7577a0c89e9d24adcd1bd86b";
        let response;
        if (selectedGenre) {
          response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&sort_by=popularity.desc`
          );
        } else {
          try {
            response = await axios.get(
              `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
            );
          } catch {
            response = await axios.get(
              `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );
          }
        }

        const data = response.data;
        if (isMounted) {
          if (data && Array.isArray(data.results)) {
            setMovies(data.results);
          } else {
            setMovies([]);
          }
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        if (isMounted) {
          setError("Failed to load movies. Please check your internet connection.");
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, [selectedGenre]);

  const currentGenreName = genres.find((g) => g.id === selectedGenre)?.name;

  return (
    <Container maxWidth="xl" sx={{ py: 3, minHeight: '80vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', mt: 2 }}>
        {selectedGenre ? `${currentGenreName} Movies` : 'Trending Movies'}
      </Typography>

      {lastSearch && (
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

      {/* Genre Filter Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 4 }}>
        {genres.map((g) => (
          <Chip
            key={g.name}
            label={g.name}
            clickable
            color={selectedGenre === g.id ? 'primary' : 'default'}
            variant={selectedGenre === g.id ? 'filled' : 'outlined'}
            onClick={() => setSelectedGenre(g.id)}
            sx={{ fontWeight: selectedGenre === g.id ? 'bold' : 'normal' }}
          />
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={50} />
        </Box>
      )}

      {error && !loading && (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 5 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 3,
            justifyItems: 'center',
          }}
        >
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              movie && movie.id ? <MovieCard key={movie.id} movie={movie} /> : null
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '1 / -1', textAlign: 'center', mt: 4 }}>
              No movies found for this genre.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}