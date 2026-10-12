import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Chip, Button, CircularProgress } from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos,credits`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (!movie) return <Typography align="center" mt={5}>Movie not found.</Typography>;

  const trailer = movie.videos?.results?.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');

  return (
    <Box sx={{ padding: '40px', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={4} sx={{ maxWidth: '1200px', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"} 
            alt={movie.title} 
            style={{ width: '100%', maxWidth: '450px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }} 
          />
        </Grid>
        <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title} ({movie.release_date?.substring(0, 4)})
          </Typography>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {movie.genres?.map(genre => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1, backgroundColor: '#1976d2', color: 'white' }} />
            ))}
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            Rating: ⭐ {movie.vote_average?.toFixed(1)} / 10
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Overview</Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            {movie.overview}
          </Typography>
          {trailer && (
            <Button 
              variant="contained" 
              color="error" 
              href={`https://www.youtube.com/watch?v=${trailer.key}`} 
              target="_blank"
              sx={{ mt: 2 }}
            >
              Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}