import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={movie.image || "https://via.placeholder.com/200"}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
    </Card>
  );
}