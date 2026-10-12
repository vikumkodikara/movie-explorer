import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate('/');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField 
            fullWidth 
            label="Username" 
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
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, py: 1.5, fontSize: '16px' }}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}