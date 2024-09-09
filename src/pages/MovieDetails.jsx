// src/pages/MovieDetails.jsx
import  { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import { WatchlistContext } from "../context/WatchlistContext";
import styles from "../styles/MovieCard.module.css";

const MovieDetails = () => {
    const { id } = useParams();
    const { watchlist, addToWatchlist, removeFromWatchlist } =
        useContext(WatchlistContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const isInWatchlist = watchlist.some((item) => item.id === parseInt(id));

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);
            try {
                const response = await fetchMovieDetails(id);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
            setLoading(false);
        };

        getMovieDetails();
    }, [id]);

    const handleWatchlist = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <div className={styles.movieDetails}>
            <img className={styles.detailsImage} src={posterUrl} alt={movie.title} />
            <div className="details">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                    <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                    <strong>Rating:</strong> ⭐ {movie.vote_average}
                </p>
                <p>
                    <strong>Genres:</strong>{" "}
                    {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <button className={styles.addToWatchList} onClick={handleWatchlist}>
                    {isInWatchlist
                        ? "Remove from Watchlist"
                        : "Add to Watchlist"}
                        
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
