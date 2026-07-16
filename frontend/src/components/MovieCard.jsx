import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-content">
        <h2>{movie.title}</h2>

        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>

        <p>
          <strong>Release Year:</strong> {movie.releaseYear}
        </p>

        <Link to={`/movie/${movie._id}`}>
          <button className="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;