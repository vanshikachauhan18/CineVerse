import { Movie } from "../models/movie.model.js";

// Add Movie
export const addMovie = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, poster } = req.body;

    // Validation
    if (!title || !description || !genre || !releaseYear) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear,
      poster,
    });

    res.status(201).json({
      message: "Movie added successfully",
      movie,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      success: true,
      count: movies.length,
      movies,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get One Movie
export const getMovieById = async (req, res) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json({
      movie,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};