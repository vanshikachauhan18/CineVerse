import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const signup = async (userData) => {
  return await axios.post(`${API}/signup`, userData);
};

export const login = async (userData) => {
  return await axios.post(`${API}/login`, userData);
};