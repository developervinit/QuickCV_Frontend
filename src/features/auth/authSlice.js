// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthStatus } from './authThunks';

// Check localStorage on initial load to set proper initial state
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  
  return {
    user: null,
    token,
    refreshToken,
    isAuthenticated: !!token, // If token exists, user is authenticated
    loading: false,
    error: null
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      
      // Store tokens in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Remove tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user || state.user;
      state.isAuthenticated = true;
      
      // Store tokens in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle checkAuthStatus pending state
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle checkAuthStatus fulfilled state
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      // Handle checkAuthStatus rejected state
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        // Only set isAuthenticated to false if tokens don't exist
        // Don't clear tokens here - let checkAuthStatus handle that
        const token = localStorage.getItem('token');
        state.isAuthenticated = !!token;
        state.error = action.payload;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, setCredentials } = authSlice.actions;
export default authSlice.reducer;
