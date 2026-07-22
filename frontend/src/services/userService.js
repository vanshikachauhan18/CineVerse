import axios from "axios";

const API = "http://localhost:5000/api/users";

const getToken = () => {
  return localStorage.getItem("token");
};

export const addToFavorites = async (movieId) => {
  return axios.put(
    `${API}/favorites/${movieId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const getFavorites = async () => {
  return axios.get(`${API}/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const removeFromFavorites = async (movieId) => {
  return axios.delete(`${API}/favorites/${movieId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};