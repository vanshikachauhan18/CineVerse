import { useState } from "react";
import toast from "react-hot-toast";
import { searchMovie, addMovie } from "../services/movieService";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [movie, setMovie] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await searchMovie(title, year);
      setMovie(res.data);
    } catch (err) {
      toast.error("Movie not found");
    }
  };

  const handleAddMovie = async () => {
    try {
      await addMovie({
        title: movie.Title,
        description: movie.Plot,
        genre: movie.Genre,
        releaseYear: Number(movie.Year),
        poster: movie.Poster,
        imdbRating: Number(movie.imdbRating),
        runtime: movie.Runtime,
      });

      toast.success("Movie added successfully!");

      setMovie(null);
      setTitle("");
      setYear("");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add movie");
    }
  };

  return (
    <div className="add-movie-page">
      <h1>Add Movie</h1>

      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Release Year (Optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search Movie
      </button>

      {movie && (
        <div className="movie-preview">
          <img src={movie.Poster} alt={movie.Title} width="250" />

          <h2>{movie.Title}</h2>

          <p>{movie.Genre}</p>

          <p>⭐ IMDb {movie.imdbRating}</p>

          <p>{movie.Runtime}</p>

          <p>{movie.Plot}</p>

          <button onClick={handleAddMovie}>
            Add to CineVerse
          </button>
        </div>
      )}
    </div>
  );
}

export default AddMovie;