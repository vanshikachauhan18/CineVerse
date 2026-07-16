import express from "express";
import { addReview,getMovieReviews } from "../controllers/review.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:movieId", authMiddleware, addReview);
router.get("/:movieId", getMovieReviews);

export default router;