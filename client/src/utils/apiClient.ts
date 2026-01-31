import axios from 'axios';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add global error handling for non-auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors for debugging
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
