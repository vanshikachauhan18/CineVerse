import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  addToFavorites,
  removeFromFavorites,
} from "../services/userService";

import "./MovieCard.css";

function MovieCard({ movie, favorites = [], setFavorites }) {

  const favorite = favorites.includes(movie._id);

  const handleFavorite = async () => {

    try {

      if (favorite) {

        await removeFromFavorites(movie._id);

        setFavorites(favorites.filter(id => id !== movie._id));

        toast.success("Removed from Favorites");

      } else {

        await addToFavorites(movie._id);

        setFavorites([...favorites, movie._id]);

        toast.success("Added to Favorites");

      }

    } catch (err) {

      toast.error(err.response?.data?.message || "Something went wrong");

    }

  };

  return (

    <div className="movie-card">

      <div
        className={`favorite-btn ${favorite ? "active" : ""}`}
        onClick={handleFavorite}
      >
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </div>

      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-content">

        <h2>{movie.title}</h2>

        <span className="genre-chip">
          {movie.genre}
        </span>

        <p>📅 {movie.releaseYear}</p>

        <div className="rating-row">
          <FaStar className="star-icon" />
          <span>{movie.averageRating || "N/A"}</span>
        </div>

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