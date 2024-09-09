// src/components/Navbar.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/MovieCard.module.css";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };

    return (
        <nav className={styles.navBar}>
            <Link to="/">Movie Library</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                    className={styles.searchInput}
                />
                <button className={styles.serachButton} type="submit">Search</button>
            </form>
            <Link to="/watchlist">Watchlist</Link>
        </nav>
    );
};

export default Navbar;
