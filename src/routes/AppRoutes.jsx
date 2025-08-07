import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage/LoginPage';
import SignupPage from '../pages/signupPage/SignupPage';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/mainLayout/MainLayout';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/" element={<LandingPage />}/>

    {/* Protected routes with layout */}
    {/* <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    /> */}

    <Route
      element={
        
          <MainLayout />
        
      }
    >
      {/* All these routes will use MainLayout and be protected */}
      <Route path="/home" element={<Home />} />
      {/* Add more protected routes here */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/settings" element={<Settings />} />
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
