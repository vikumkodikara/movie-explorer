import React, { useContext } from 'react';
import { Typography, Box, Container } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../context/MovieContext';

export default function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <Container maxWidth="xl" sx={{ py: 3, minHeight: '80vh' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', mt: 2 }}>
        My Favorite Movies
      </Typography>
      
      {favorites.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 3,
            justifyItems: 'center',
          }}
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 5 }}>
          No favorite movies added yet. Click the heart icon on a movie to add it here!
        </Typography>
      )}
    </Container>
  );
}