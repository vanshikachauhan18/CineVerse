import { useEffect, useState } from "react";
import { getFavorites } from "../services/userService";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data.favorites);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="movies-page">

      <h1>❤️ My Favorites</h1>

      <div className="movie-grid">

        {favorites.length > 0 ? (

          favorites.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              favorites={favorites.map(m => m._id)}
              setFavorites={() => {}}
            />
          ))

        ) : (

          <h2>No favorite movies yet.</h2>

        )}

      </div>

    </div>
  );
}

export default Favorites;