// src/pages/Watchlist.jsx
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
    const { watchlist } = useContext(WatchlistContext);

    return (
        <div>
            <h1>Your Watchlist</h1>
            {watchlist.length > 0 ? (
                <div className="movie-grid">
                    {watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>Your watchlist is empty.</p>
            )}
        </div>
    );
};

export default Watchlist;
