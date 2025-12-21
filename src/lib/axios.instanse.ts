import axios from "axios";
import { toast } from "sonner";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api" ||
    "http://localhost:3000/api", // Default base URL
  timeout: 300000, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
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

axiosInstance.interceptors.response.use(
  (response) => {
    // GET requests do not show success toast
    if (response.config.method !== "get") {
      toast.success("Success", {
        duration: 3000,
        description: response.data.message || "Request was successful",
      });
    }
    return response;
  },

  (error) => {
    const method = error.config?.method;

    if (method !== "get") {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error("Error", {
        duration: 3000,
        description: message,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
