import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { addMovie } from "../services/movieService";
import "./AddMovie.css";

function AddMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    poster: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !movie.title ||
      !movie.genre ||
      !movie.releaseYear ||
      !movie.description
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addMovie(movie);

      toast.success("Movie added successfully!");

      navigate("/movies");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add movie."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="add-movie-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="add-movie-card">

        <h1>🎬 Add New Movie</h1>

        <p>Add your favourite movie to CineVerse.</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={movie.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={movie.genre}
            onChange={handleChange}
          />

          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={movie.releaseYear}
            onChange={handleChange}
          />

          <input
            type="text"
            name="poster"
            placeholder="Poster URL"
            value={movie.poster}
            onChange={handleChange}
          />

          {movie.poster && (
            <div className="poster-preview">
              <img
                src={movie.poster}
                alt="Poster Preview"
                onError={(e) => {
                  e.target.src = noPoster;
                }}
              />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Movie Description"
            rows="6"
            value={movie.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding Movie..." : "➕ Add Movie"}
          </button>

        </form>

      </div>
    </motion.div>
  );
}

export default AddMovie;