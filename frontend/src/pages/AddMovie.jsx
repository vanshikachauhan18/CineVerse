import { useState } from "react";
import toast from "react-hot-toast";
import { searchMovie, addMovie } from "../services/movieService";
import "./AddMovie.css";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState("");

  const handleSearch = async () => {
    if (!title.trim()) {
      toast.error("Please enter a movie title");
      return;
    }

    try {
      const res = await searchMovie(title, year);

      console.log("OMDb Movie Data:", res.data);

      setMovie(res.data);

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Movie not found"
      );
    }
  };

  const handleAddMovie = async () => {
    if (!movie) {
      toast.error("Please search for a movie first");
      return;
    }

    // Check IMDb rating
    if (
      !movie.imdbRating ||
      movie.imdbRating === "N/A"
    ) {
      toast.error("IMDb rating not found");
      return;
    }

    try {
      const movieData = {
        title: movie.Title,
        description: movie.Plot,
        genre: movie.Genre,
        releaseYear: Number(movie.Year),
        poster: movie.Poster,
        imdbRating: Number(movie.imdbRating),
        runtime: movie.Runtime,
        backdrop: backdrop,
      };

      console.log("Adding movie:", movieData);

      await addMovie(movieData);

      toast.success("Movie added successfully!");

      setMovie(null);
      setTitle("");
      setYear("");
      setBackdrop("");

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to add movie"
      );
    }
  };

  return (
    <div className="add-movie-page">

      <div className="add-container">

        <h1>🎬 Add Movie</h1>

        <div className="search-form">

          <input
            type="text"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Year (Optional)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            type="text"
            placeholder="Backdrop Image URL"
            value={backdrop}
            onChange={(e) => setBackdrop(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

        {movie && (
          <div className="movie-preview">

            <img
              src={movie.Poster}
              alt={movie.Title}
            />

            <div className="preview-content">

              <h2>{movie.Title}</h2>

              <p>
                <strong>Genre:</strong>{" "}
                {movie.Genre}
              </p>

              <p>
                <strong>Released:</strong>{" "}
                {movie.Year}
              </p>

              <p>
                <strong>Runtime:</strong>{" "}
                {movie.Runtime}
              </p>

              <p className="imdb">
                ⭐ IMDb {movie.imdbRating}
              </p>

              <p>
                {movie.Plot}
              </p>

              <button
                className="add-btn"
                onClick={handleAddMovie}
              >
                ➕ Add To CineVerse
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AddMovie;
