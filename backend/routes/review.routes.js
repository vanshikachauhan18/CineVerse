import express from "express";
import { addReview,getMovieReviews,deleteReview } from "../controllers/review.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:movieId", authMiddleware, addReview);
router.get("/:movieId", getMovieReviews);
router.delete("/:reviewId", authMiddleware, deleteReview);

export default router;