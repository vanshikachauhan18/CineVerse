import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#1e293b",
        color: "#fff",
        border: "1px solid #ff7b00",
      },
    }}
  />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/add-movie" element={<AddMovie />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;