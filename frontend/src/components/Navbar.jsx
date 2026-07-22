import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="navbar">
      <h2>CineVerse</h2>

      <div className="logo">
    <Link to="/">CineVerse</Link>
    </div>   

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/add-movie">Add Movie</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;