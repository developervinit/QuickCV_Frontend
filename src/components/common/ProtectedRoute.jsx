// src/components/common/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  // Check if tokens exist in localStorage
  const hasToken = localStorage.getItem('token');
  
  // If loading OR if we have a token but not authenticated yet (race condition)
  // wait for auth check to complete
  if (loading || (hasToken && !isAuthenticated)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;