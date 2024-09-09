/* eslint-disable react/prop-types */
// src/context/WatchlistContext.jsx
import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        const storedWatchlist = localStorage.getItem("watchlist");
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    // Update localStorage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prevList) => [...prevList, movie]);
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prevList) =>
            prevList.filter((movie) => movie.id !== movieId)
        );
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlist, addToWatchlist, removeFromWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};
