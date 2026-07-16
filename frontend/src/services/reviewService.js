import axios from "axios";

const API = "http://localhost:5000/api/reviews";

export const addReview = async (movieId, reviewData) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API}/${movieId}`,
        reviewData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const getReviews = async (movieId) => {

  return await axios.get(`${API}/${movieId}`);

};