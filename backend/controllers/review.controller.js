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