import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navibar.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeContextProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <MovieProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetails />} /> 
              <Route path="/favorites" element={<Favorites />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/signup" element={<Signup />} /> 
            </Routes>
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}