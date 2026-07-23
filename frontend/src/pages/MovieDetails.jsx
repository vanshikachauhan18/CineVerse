import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getMovieById } from "../services/movieService";
import { addReview, getReviews, deleteReview } from "../services/reviewService";
import StarRating from "../components/StarRating";

import "./MovieDetails.css";


function MovieDetails() {

  const { id } = useParams();


  const [movie, setMovie] = useState(null);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchMovie(),
      fetchReviews();
  }, [id]);

  const handleReviewSubmit = async () => {

    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {

      await addReview(movie._id, {
        rating: Number(rating),
        review,
      });

      toast.success("Review added successfully!");

      setReview("");
      setRating(0);
      fetchReviews();

    } catch (err) {

      toast.error(err.response?.data?.message || "Failed to add review");
    }
  };
  const fetchReviews = async () => {

    try {

      const res = await getReviews(id);

      setReviews(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  const handleDeleteReview = async (reviewId) => {

    try {

      await deleteReview(reviewId);

      toast.success("Review deleted successfully!");

      fetchReviews();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Failed to delete review"
      );

    }

  };
  const fetchMovie = async () => {

    try {

      const res = await getMovieById(id);

      setMovie(res.data.movie);

    } catch (error) {

      console.log(error);

    }

  };

  if (!movie) {
    return <h2>Loading...</h2>;
  }
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const averageRating =
    reviews.length > 0
      ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      ).toFixed(1)
      : 0;
  const ratingStats = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));

  return (
    <>
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(${movie.backdrop || movie.poster})`,
        }}
      >
        <div className="banner-overlay">

          <h1>{movie.title}</h1>

          <div className="banner-rating">
            ⭐ {averageRating}
            <span>({reviews.length} Reviews)</span>
          </div>

          <div className="banner-tags">

            <span>{movie.genre}</span>

            <span>{movie.releaseYear}</span>

          </div>

        </div>

      </div>
      <div className="movie-details">

        {/* LEFT SIDE */}

        <div className="movie-poster">
          <img
            src={movie.poster}
            alt={movie.title}
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="movie-info">

          <h1 className="movie-title">
            {movie.title}
          </h1>

          <div className="movie-rating">
            ⭐ {averageRating}
            <span className="review-count">
              ({reviews.length} Reviews)
            </span>
          </div>

          <div className="rating-stats">

            {ratingStats.map((item) => (

              <div
                className="rating-row"
                key={item.star}
              >
                <span>
                  {"⭐".repeat(item.star)}
                </span>

                <span>
                  {item.count}
                </span>

              </div>

            ))}

          </div>

          <div className="movie-meta">

            <span className="genre-badge">
              🎭 {movie.genre}
            </span>

            <span className="year-badge">
              📅 {movie.releaseYear}
            </span>

          </div>

          <p className="movie-description">
            {movie.description}
          </p>

          <div className="review-section">

            <h3>
              Write a Review
            </h3>

            <StarRating
              rating={rating}
              setRating={setRating}
            />

            <textarea
              rows="5"
              placeholder="Share your thoughts about this movie..."
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
            />

            <button
              className="review-btn"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>

          </div>

        </div>

      </div>

      {/* USER REVIEWS */}

      <div className="reviews-list">

        <h2>
          User Reviews
        </h2>

        {reviews.length === 0 ? (

          <p
            style={{
              color: "white",
              fontSize: "18px",
            }}
          >
            No reviews yet.
          </p>

        ) : (

          reviews.map((item) => (

            <div
              className="review-card"
              key={item._id}
            >

              <h3>
                👤 {item.user?.userName || "Anonymous"}
              </h3>

              <p className="stars">
                {"⭐".repeat(item.rating)}
              </p>

              <p>
                {item.review}
              </p>

              {currentUser?.id === item.user?._id && (

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteReview(item._id)
                  }
                >
                  🗑 Delete Review
                </button>

              )}

            </div>

          ))

        )}

      </div>

    </>
  );
}

export default MovieDetails;