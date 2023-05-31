import axios from "axios";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/refreshToken", // API endpoint to refresh the token
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

const api = axios.create({
  baseURL: "http://localhost:8000", // API base URL
  withCredentials: true, // Send cookies with requests
});

// Add an interceptor to check for token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error response has a status code indicating token expiration
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      // Attempt to refresh the access token
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        // Handle the refresh error or redirect to the login page
        console.error("Failed to refresh token:", refreshError);
        // Redirect to the login page or display a notification to the user
      }
    }

    // For other error cases, return the original error
    return Promise.reject(error);
  }
);

export default api;
