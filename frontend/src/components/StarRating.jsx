import { FaStar } from "react-icons/fa";
import "./StarRating.css";

function StarRating({ rating, setRating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "star active" : "star"}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
}

export default StarRating;