// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './features/auth/authThunks';
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Only check auth status if tokens exist
    // This prevents unnecessary API calls and error messages on login page
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (token && refreshToken) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);
  
  return <AppRoutes />;
}

export default App;
