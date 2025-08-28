// src/hooks/useGoogleAuth.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import { getCurrentUser } from '../features/auth/authThunks';
import { toast } from 'react-toastify';

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for OAuth callback parameters
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const userId = searchParams.get('userId');

    if (token && refreshToken && userId) {
      // Store tokens and user data
      dispatch(loginSuccess({ 
        token, 
        refreshToken, 
        user: { _id: userId } // Temporary user object
      }));
      
      // Fetch full user data
      dispatch(getCurrentUser())
        .unwrap()
        .then(() => {
          toast.success('Login successful!');
          navigate('/home');
        })
        .catch(() => {
          toast.error('Failed to fetch user data');
        });
    }
  }, [location, dispatch, navigate]);

  const initiateGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return { initiateGoogleLogin };
};







// useGoogleOAuth.js
// export const useGoogleOAuth = () => {
//   const redirectToGoogleLogin = () => {
//     const params = new URLSearchParams({
//       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//       redirect_uri: 'https://your-backend.com/oauth2/callback',
//       response_type: 'code',
//       scope: 'openid profile email',
//       access_type: 'offline',
//       prompt: 'consent',
//     });
//     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
//   };

//   return { redirectToGoogleLogin };
// };
