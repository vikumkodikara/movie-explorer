import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(MovieContext);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A';
  const imageUrl = movie.image || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450");

  return (
    <Card 
      sx={{ width: 250, margin: '15px' }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="375"
          image={imageUrl}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap title={movie.title}>
            {movie.title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {releaseYear}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#f5c518', fontWeight: 'bold', mr: 1 }}>
                ⭐ {rating}
              </Typography>
              <IconButton 
                onClick={handleFavoriteClick} 
                size="small" 
                sx={{ color: isFavorite ? 'red' : 'gray', p: 0 }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}