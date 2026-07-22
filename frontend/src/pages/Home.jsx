import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaHeart, FaFilm } from "react-icons/fa";

import heroBg from "../assets/images/hero-bg.jpg";

import "./Home.css";

function Home() {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,20,.75), rgba(10,10,20,.9)), url(${heroBg})`,
      }}
    >
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          transition={{ delay: .3 }}
        >
          🎬 CineVerse
        </motion.h1>

        <p>
          Discover. Review. Share your favourite movies.
        </p>

        <Link to="/movies">
          <button className="browse-btn">
            Browse Movies →
          </button>
        </Link>

      </motion.div>

      <motion.div
        className="features"
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        transition={{ delay:.3 }}
      >

        <div className="feature-card">
          <FaFilm />
          <h3>Movies</h3>
          <p>Explore a growing collection.</p>
        </div>

        <div className="feature-card">
          <FaStar />
          <h3>Reviews</h3>
          <p>Rate and review every movie.</p>
        </div>

        <div className="feature-card">
          <FaHeart />
          <h3>Favorites</h3>
          <p>Save movies to your personal collection.</p>
        </div>

      </motion.div>

    </div>
  );
}

export default Home;