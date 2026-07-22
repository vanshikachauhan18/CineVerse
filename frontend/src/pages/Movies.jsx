import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../services/userService";
import SearchBar from "../components/SearchBar";
import "./Movies.css";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchFavorites();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data.favorites);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-page">

      <h1>🎬 Explore Movies</h1>

      <p>
        Discover, review and explore your favourite movies.
      </p>
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
              favorites={favorites}
              setFavorites={setFavorites}

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