import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Button, CircularProgress, Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MovieContext } from '../context/MovieContext';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useContext(MovieContext);
    const cast = movie?.credits?.cast?.slice(0, 8) || [];

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY || "65322f0f7577a0c89e9d24adcd1bd86b";
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`
                );
                setMovie(response.data);
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

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress size={60} /></Box>;
    if (!movie) return <Typography align="center" mt={8} variant="h5">Movie not found.</Typography>;

    const trailer = movie.videos?.results?.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer');
    const isFavorite = favorites?.some((fav) => fav.id === movie.id);

    return (
        <Container maxWidth="xl" sx={{ py: 5, minHeight: '85vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: { xs: 4, md: 6 },
                    maxWidth: '1200px',
                    mx: 'auto',
                }}
            >
                {/* Left Side: Movie Poster Image */}
                <Box
                    sx={{
                        flexShrink: 0,
                        width: { xs: '100%', sm: '350px', md: '420px' },
                        maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"}
                        alt={movie.title}
                        style={{
                            width: '100%',
                            maxHeight: '620px',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
                        }}
                    />
                </Box>

                {/* Right Side: Movie Details, Ratings & Info */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: { xs: 'center', md: 'left' },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
                        {movie.title} {movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ''}
                    </Typography>

                    {movie.tagline && (
                        <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 2 }}>
                            "{movie.tagline}"
                        </Typography>
                    )}

                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                        {movie.genres?.map(genre => (
                            <Chip key={genre.id} label={genre.name} sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 500 }} />
                        ))}
                    </Box>

                    <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
                        Rating: <span style={{ color: '#f5c518', fontWeight: 'bold' }}>⭐ {movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A'}</span> / 10
                        {movie.runtime ? <span style={{ color: '#888', marginLeft: '12px', fontSize: '0.9rem' }}>• {movie.runtime} min</span> : null}
                    </Typography>

                    <Typography variant="h5" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>Overview</Typography>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                        {movie.overview || "No overview available for this movie."}
                    </Typography>

                    <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        {trailer && (
                            <Button
                                variant="contained"
                                color="error"
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                size="large"
                                sx={{ px: 3, py: 1.2, fontWeight: 'bold' }}
                            >
                                Watch Trailer
                            </Button>
                        )}

                        <Button
                            variant="outlined"
                            color={isFavorite ? "error" : "primary"}
                            onClick={() => toggleFavorite(movie)}
                            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            size="large"
                            sx={{ px: 3, py: 1.2, fontWeight: 'bold' }}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </Button>
                    </Box>

                    {/* Top Cast Section */}
                    {cast.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Top Cast
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                {cast.map((actor) => (
                                    <Box key={actor.id} sx={{ width: 110, textAlign: 'center' }}>
                                        <img
                                            src={actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : 'https://via.placeholder.com/110x150?text=No+Photo'}
                                            alt={actor.name}
                                            style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <Typography variant="body2" fontWeight="bold" noWrap title={actor.name} sx={{ mt: 0.5 }}>
                                            {actor.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" noWrap title={actor.character} display="block">
                                            {actor.character}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
}