import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navibar.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import { ThemeContextProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <MovieProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} /> 
            <Route path="/favorites" element={<Favorites />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeContextProvider>
  );
}