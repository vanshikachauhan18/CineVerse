import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const review = await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      user: req.user.id,
      movie: req.params.movieId,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMovieReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      movie: req.params.movieId
    }).populate("user", "userName");

    res.status(200).json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
  export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Only the owner can delete
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this review",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

