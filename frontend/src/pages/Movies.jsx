import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "./Movies.css";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-page">

      <h1>🎬 All Movies</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="movie-grid">

        {filteredMovies.length > 0 ? (

          filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
            />
          ))

        ) : (

          <h2 style={{ color: "white" }}>
            No Movies Found
          </h2>

        )}

      </div>

    </div>
  );
}

export default Movies;