// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery().get("query");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!query) return;

        const getSearchResults = async () => {
            setLoading(true);
            try {
                const response = await searchMovies(query, page);
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error searching movies:", error);
            }
            setLoading(false);
        };

        getSearchResults();
    }, [query, page]);

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    if (!query) {
        return <p>Please enter a search term.</p>;
    }

    return (
        <div>
            <h1>Search Results for &quot;{query}&quot;</h1>
            {loading ? (
                <p>Loading...</p>
            ) : movies.length > 0 ? (
                <>
                    <div className="movie-grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={handlePrev} disabled={page === 1}>
                            Previous
                        </button>
                        <span>
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
