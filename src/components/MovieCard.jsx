/* eslint-disable react/prop-types */
// src/components/MovieCard.jsx

import { Link } from "react-router-dom";
import styles from "../styles/MovieCard.module.css";

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <div className={styles.movieCard}>
            <Link to={`/movie/${movie.id}`}>
                <img className={styles.w100} src={posterUrl} alt={movie.title} />
                <div className={styles.movieInfo}>
                    <h3>{movie.title}</h3>
                    <p>⭐ {movie.vote_average}</p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
