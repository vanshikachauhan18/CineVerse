import axios from "axios";

export const searchMovie = async (req, res) => {
  try {
    const { title, year } = req.query;
    console.log("OMDB API KEY:", process.env.OMDB_API_KEY);

    if (!title) {
      return res.status(400).json({
        message: "Movie title is required",
      });
    }

    let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(title)}`;

    if (year) {
      url += `&y=${year}`;
    }

    const response = await axios.get(url);

    if (response.data.Response === "False") {
      return res.status(404).json({
        message: response.data.Error,
      });
    }

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};