import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/movies/');
                if (response.ok) {
                    const data = await response.json();
                    setMovies(data);
                } else {
                    console.error('Failed to fetch movies');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="app" style={{ padding: "0px 10px 0px 10px" }}>
                            <Header />
                            <main className="content">
                                <h1 className="main-heading">The Best movie reviews site!</h1>
                                <SearchBox onSearch={handleSearch} />
                                <div className="movie-cards">
                                    {filteredMovies.map(movie => (
                                        <MovieCard key={movie._id} _id={movie._id} title={movie.name} releaseDate={new Date(movie.releaseDate).toDateString()} rating={movie.averageRating} />
                                    ))}
                                </div>
                            </main>
                            <Footer />
                        </div>
                    }
                />
                <Route path="/movie/:id" element={<MovieDetailsWrapper />} />
            </Routes>
        </Router>
    );
}

const MovieDetailsWrapper = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/movies/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setMovie(data);
                } else {
                    console.error('Failed to fetch movie details');
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return movie && <MovieDetails movie={movie} />;
};

export default App;
