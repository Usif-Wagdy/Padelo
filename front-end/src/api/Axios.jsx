import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instance
export const Axios = axios.create({
  baseURL: "https://padelo-g92x.vercel.app/",
  // baseURL: "http://localhost:3000/",
});

// Add a request interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
