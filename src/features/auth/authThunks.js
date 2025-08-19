// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, setUser } from './authSlice';
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
