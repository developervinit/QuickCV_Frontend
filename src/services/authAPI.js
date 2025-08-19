// src/services/authAPI.js
import axiosInstance from './axiosInstance';

export const authAPI = {
  // Email/Password authentication
  login: (credentials) => axiosInstance.post('/api/auth/login', credentials),
  signup: (userData) => axiosInstance.post('/api/auth/signup', userData),
  
  // Google OAuth
  googleLogin: () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  },
  
  // User management
  getCurrentUser: () => axiosInstance.get('/api/auth/user'),
  logout: () => axiosInstance.post('/api/auth/logout'),
  
  // Token refresh
  refreshToken: (refreshToken) => 
    axiosInstance.post('/api/auth/refresh', { refreshToken })
};