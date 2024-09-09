// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getPopularMovies = async () => {
            setLoading(true);
            try {
                const response = await fetchPopularMovies(page);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
            setLoading(false);
        };

        getPopularMovies();
    }, [page]);

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div>
            <h1>Popular Movies</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={handlePrev} disabled={page === 1}>
                    Previous
                </button>
                <span>
                    {page} / {totalPages}
                </span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
