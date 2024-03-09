import React from 'react';
import { Link } from 'react-router-dom';
import "./moviecard.css";

const MovieCard = ({ title, releaseDate, rating, _id }) => {
    return (
        <Link to={`/movie/${_id}`} className="movie-card" style={{ textDecoration: 'none' }}>
            <div className="movie-title">{title}</div>
            <div className="release-date">Released: {releaseDate}</div>
            <div className="rating" style={{float: "left", color: "black"}}>Rating: {rating}/10</div>
        </Link>
    );
}

export default MovieCard;
