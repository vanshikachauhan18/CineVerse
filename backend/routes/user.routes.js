import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  toggleFavorite,
  getFavorites,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put(
  "/favorites/:movieId",
  authMiddleware,
  toggleFavorite
);

router.get(
  "/favorites",
  authMiddleware,
  getFavorites
);

export default router;