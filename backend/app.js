import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

import movieRoutes from "./routes/movie.routes.js";

import reviewRoutes from "./routes/review.routes.js"

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
//POST http://localhost:5000/api/auth/signup

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);


app.use(cookieParser());

export default app;