import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

import { addToFavorites, removeFromFavorites } from "../services/userService";

import "./MovieCard.css";

function MovieCard({ movie }) {
  const [favorite, setFavorite] =useState(false);

  const handleFavorite = async () => {
    try {
      if (favorite) {
        await removeFromFavorites(movie._id);
        toast.success("Removed from Favorites");
      } else {
        await addToFavorites(movie._id);
        toast.success("Added to Favorites");
      }

      setFavorite(!favorite);
    } catch (err) {
      toast.error("Login to use Favorites");
    }
  };

  return (
    <div className="movie-card">

      <div className="favorite-btn" onClick={handleFavorite}>
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </div>

      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-content">

        <h2>{movie.title}</h2>

        <p>
          🎭 {movie.genre}
        </p>

        <p>
          📅 {movie.releaseYear}
        </p>

        <Link to={`/movie/${movie._id}`}>
          <button className="details-btn">
            View Details →
          </button>
        </Link>

      </div>

    </div>
  );
}

export default MovieCard;