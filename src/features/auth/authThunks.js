// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, setUser, setCredentials } from './authSlice';
import axios from '../../services/axiosInstance';
import { toast } from 'react-toastify';

// Email/Password Login
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post('/api/auth/login', credentials);
      const { user, token, refreshToken } = response.data;
      
      dispatch(loginSuccess({ user, token, refreshToken }));
      toast.success('Login successful!');
      return { user, token, refreshToken };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Email/Password Signup
export const signupWithEmail = createAsyncThunk(
  'auth/signupWithEmail',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post('/api/auth/signup', userData);
      const { user, token, refreshToken } = response.data;
      
      dispatch(loginSuccess({ user, token, refreshToken }));
      toast.success('Account created successfully!');
      return { user, token, refreshToken };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Google Login
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // This will redirect to Google OAuth
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    } catch (error) {
      const errorMessage = 'Google login failed';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.log('Logout error (continuing with local logout):', error);
    } finally {
      dispatch(logoutAction());
      toast.info('You have been logged out');
    }
  }
);

// Get current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('/api/auth/user');
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = 'Failed to fetch user data';
      return rejectWithValue(errorMessage);
    }
  }
);

// Check auth status to keep user logged-in.
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!token || !refreshToken) {
        return rejectWithValue('No tokens found');
      }
      
      // Try to get user data with current token
      const response = await axios.get('/api/auth/user');
      dispatch(setCredentials({ 
        token, 
        refreshToken, 
        user: response.data 
      }));
      
      return response.data;
    } catch (error) {
      // Check if it's a network error or actual auth error
      const isNetworkError = !error.response;
      const isAuthError = error.response?.status === 401 || error.response?.status === 403;
      
      // If token is expired (401), try to refresh it
      if (isAuthError && error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            // No refresh token, clear everything
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return rejectWithValue('Authentication expired');
          }
          
          const response = await axios.post('/api/auth/refresh', { refreshToken });
          const { token: newToken, refreshToken: newRefreshToken } = response.data;
          
          // Get user data with new token
          const userResponse = await axios.get('/api/auth/user', {
            headers: { Authorization: `Bearer ${newToken}` }
          });
          
          dispatch(setCredentials({ 
            token: newToken, 
            refreshToken: newRefreshToken || refreshToken,
            user: userResponse.data 
          }));
          
          return userResponse.data;
        } catch (refreshError) {
          // Only clear tokens if refresh explicitly fails with auth error
          if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return rejectWithValue('Authentication expired');
          }
          // If it's a network error during refresh, don't clear tokens
          return rejectWithValue('Network error during token refresh');
        }
      }
      
      // For network errors, don't clear tokens - user might be offline
      if (isNetworkError) {
        return rejectWithValue('Network error. Please check your connection.');
      }
      
      // For other errors, don't clear tokens immediately
      // Let the user stay logged in if they have valid tokens
      return rejectWithValue(error.response?.data?.message || 'Failed to verify authentication');
    }
  }
);
