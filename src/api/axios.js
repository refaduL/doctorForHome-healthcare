import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// simple clean error normalize
export const handleApiError = (error) => {
  if (error.response) {
    return (
      error.response.data?.message ||
      `Request failed (${error.response.status})`
    );
  }
  if (error.request) return "Server not responding";
  return error.message || "Something went wrong";
};

export default api;