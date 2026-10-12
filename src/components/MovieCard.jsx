import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites = [], toggleFavorite } = useContext(MovieContext) || {};

  if (!movie) return null;

  const isFavorite = Array.isArray(favorites) ? favorites.some((fav) => fav?.id === movie.id) : false;

  const handleFavoriteClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (typeof toggleFavorite === 'function') {
      toggleFavorite(movie);
    }
  };

  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A';
  const imageUrl = movie.image || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450");

  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 280, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="375"
          image={imageUrl}
          alt={movie.title}
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap title={movie.title}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {releaseYear}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 1, pt: 1 }}>
        <Typography variant="body2" sx={{ color: '#f5c518', fontWeight: 'bold' }}>
          ⭐ {rating}
        </Typography>
        <IconButton 
          onClick={handleFavoriteClick} 
          size="small" 
          sx={{ color: isFavorite ? 'red' : 'gray' }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
}