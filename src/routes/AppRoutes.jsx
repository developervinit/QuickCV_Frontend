// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage/LoginPage';
import SignupPage from '../pages/signupPage/SignupPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/mainLayout/MainLayout';
import ResumeFormPage from '../pages/resumeFormPage/ResumeFormPage';
import ResumeListPage from '../pages/resumeListPage/ResumeListPage';
import AuthLayout from '../layouts/authLayout/AuthLayout';
import PublicLayout from '../layouts/publicLayout/PublicLayout';

const AppRoutes = () => (
  <Routes>
    {/* Public routes with layout */}
     <Route path="/" element={<LandingPage />} />
    

    {/* Auth routes with layout */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    

    {/* Protected routes with layout */}
    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<ResumeFormPage />} />
      <Route path="/resumelist" element={<ResumeListPage />} />
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
