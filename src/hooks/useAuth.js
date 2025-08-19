// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginWithEmail, signupWithEmail, logoutUser, getCurrentUser } from '../features/auth/authThunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error, token } = useSelector((state) => state.auth);

  const login = useCallback(
    (credentials) => dispatch(loginWithEmail(credentials)),
    [dispatch]
  );

  const signup = useCallback(
    (userData) => dispatch(signupWithEmail(userData)),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(logoutUser()),
    [dispatch]
  );

  const fetchCurrentUser = useCallback(
    () => dispatch(getCurrentUser()),
    [dispatch]
  );

  return {
    user,
    isAuthenticated,
    loading,
    error,
    token,
    login,
    signup,
    logout,
    fetchCurrentUser
  };
};