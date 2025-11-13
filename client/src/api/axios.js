// client/src/api/axios.js

import axios from "axios";

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ backend URL
});

// Optionally, add interceptors if you want to auto-add token for every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
