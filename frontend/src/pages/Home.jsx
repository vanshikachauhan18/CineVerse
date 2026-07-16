import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <h1>
          🎬 CineVerse
        </h1>

        <p>
          Discover, review and rate your favourite movies.
        </p>

        <input
          type="text"
          placeholder="🔍 Search your favourite movie..."
          className="search-box"
        />

        <Link to="/movies">
          <button className="browse-btn">
            Browse Movies
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;