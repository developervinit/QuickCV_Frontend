// src/services/axiosInstance.js
import axios from 'axios';
import store from '../store/store';
import { logout, setCredentials } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired, try to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        
        if (refreshToken) {
          // Call refresh token endpoint
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken } = response.data;
          
          // Update store with new token
          store.dispatch(setCredentials({ 
            token: accessToken,
            refreshToken: response.data.refreshToken,
            user: state.auth.user
          }));
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        store.dispatch(logout());
        toast.error('Session expired. Please log in again.');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;