import { User } from "../models/user.model.js";

export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const index = user.favorites.findIndex(
      (id) => id.toString() === movieId
    );

    if (index === -1) {
      user.favorites.push(movieId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("favorites");

    res.status(200).json(user.favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};