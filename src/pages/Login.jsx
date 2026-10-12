import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField 
            fullWidth 
            label="Username or Email" 
            margin="normal" 
            variant="outlined" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            margin="normal" 
            variant="outlined" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            disabled={loading}
            sx={{ mt: 3, py: 1.5, fontSize: '16px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <MuiLink component={Link} to="/signup" underline="hover">
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}