// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './features/auth/authThunks';
import AppRoutes from './routes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Check if user is already authenticated on app load
    dispatch(checkAuthStatus());
  }, [dispatch]);
  
  return <AppRoutes />;
}

export default App;
