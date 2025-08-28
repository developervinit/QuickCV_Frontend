// src/services/authAPI.js
import axiosInstance from './axiosInstance';

export const authAPI = {
  // Email/Password authentication
  login: (credentials) => axiosInstance.post('/api/auth/login', credentials),
  signup: (userData) => axiosInstance.post('/api/auth/signup', userData),
  
  // Google OAuth
  googleLogin: () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL;
  },
  
  // User management
  getCurrentUser: () => axiosInstance.get('/api/auth/user'),
  logout: () => axiosInstance.post('/api/auth/logout'),
  
  // Token refresh
  refreshToken: (refreshToken) => { 
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    axiosInstance.post(`${backendUrl}/api/auth/refresh`, { refreshToken });
  }
};