import axios from "axios";

const API = "http://localhost:5000/api/movies";

// Get All Movies
export const getMovies = async () => {
  return await axios.get(API);
};

//Get One Movie by id
export const getMovieById = async (id) => {
  return await axios.get(`${API}/${id}`);
};

// Add Movie (we'll use this later)
export const addMovie = async (movieData) => {
  return await axios.post(API, movieData);
};