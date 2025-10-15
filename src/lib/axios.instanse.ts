import axios from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1", // Default base URL
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // If you store token in localStorage or cookies, attach it here
//     const token =
//       typeof window !== "undefined"
//         ? localStorage.getItem("accessToken")
//         : null;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
