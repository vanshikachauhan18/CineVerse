import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { addReview,getReviews } from "../services/reviewService";
import "./MovieDetails.css";

function MovieDetails() {

  const { id } = useParams();
  

  const [movie, setMovie] = useState(null);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

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

  try {

    await addReview(movie._id, {
      rating,
      review,
    });

    alert("Review added successfully!");

    setReview("");
    setRating(5);
    fetchReviews();

  } catch (err) {

    alert(err.response?.data?.message || "Failed to add review");

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

  
  return (
  <div className="movie-details">

    <div className="movie-poster">
      <img src={movie.poster} alt={movie.title} />
    </div>

    <div className="movie-info">

      <h1>{movie.title}</h1>

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>

      <p>
        <strong>Release Year:</strong> {movie.releaseYear}
      </p>

      <p className="movie-description">
        {movie.description}
      </p>

      <div className="movie-rating">
        ⭐⭐⭐⭐⭐
      </div>

      <div className="review-section">

      <h3>Write a Review</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
      <option value={1}>⭐ 1</option>
      <option value={2}>⭐⭐ 2</option>
      <option value={3}>⭐⭐⭐ 3</option>
      <option value={4}>⭐⭐⭐⭐ 4</option>
      <option value={5}>⭐⭐⭐⭐⭐ 5</option>
     </select>

     <textarea
    placeholder="Write your review..."
    value={review}
    onChange={(e) => setReview(e.target.value)}
    rows="5"
  />

  <button
  className="review-btn"
  onClick={handleReviewSubmit}
  >
  Submit Review
 </button>

</div>

    </div>
    <div className="reviews-list">

  <h2>User Reviews</h2>

  {reviews.length === 0 ? (

    <p>No reviews yet.</p>

  ) : (

    reviews.map((item) => (

      <div className="review-card" key={item._id}>

        <h3>
          {item.user?.userName || "Anonymous"}
        </h3>

        <p className="stars">
          {"⭐".repeat(item.rating)}
        </p>

        <p>
          {item.review}
        </p>

      </div>

    ))

  )}

  </div> 
  </div>
);

}

export default MovieDetails;