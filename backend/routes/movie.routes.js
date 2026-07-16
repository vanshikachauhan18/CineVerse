import express from "express";
import { addMovie,getAllMovies,getMovieById } from "../controllers/movie.controller.js";


const router = express.Router();

router.post("/", addMovie);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

export default router;