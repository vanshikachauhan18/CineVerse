import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <motion.div
      className="movie-card"
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="poster-container">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x450?text=No+Poster";
          }}
        />
      </div>

      <div className="movie-content">
        <h2>{movie.title}</h2>

        <div className="movie-tags">
          <span>🎭 {movie.genre}</span>
          <span>📅 {movie.releaseYear}</span>
        </div>

        <Link to={`/movie/${movie._id}`}>
          <button className="details-btn">
            View Details →
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default MovieCard;