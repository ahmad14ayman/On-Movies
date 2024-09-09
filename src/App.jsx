/* eslint-disable no-unused-vars */
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

const App = () => {
    return (
        <WatchlistProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                    </Routes>
                </div>
            </Router>
        </WatchlistProvider>
    );
};

export default App;
