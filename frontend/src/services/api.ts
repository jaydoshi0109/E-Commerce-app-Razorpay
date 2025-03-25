import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if using a different port
  withCredentials: false,
});

export default API;
