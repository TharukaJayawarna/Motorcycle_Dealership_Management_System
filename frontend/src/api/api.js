import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
