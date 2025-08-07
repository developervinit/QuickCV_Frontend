import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage/LoginPage';
import SignupPage from '../pages/signupPage/SignupPage';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/mainLayout/MainLayout';
import ResumeFormPage from '../pages/resumeFormPage/ResumeFormPage';
import ResumeListPage from '../pages/resumeListPage/ResumeListPage';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/" element={<LandingPage />}/>


    {/* Just uncomment to Protected routes with layout */}
    <Route
      element={
        // <ProtectedRoute>
          <MainLayout />
        // </ ProtectedRoute>
      }
    >
      {/* All these routes will use MainLayout and be protected */}
      <Route path="/home" element={<ResumeFormPage />} />
      {/* Add more protected routes here */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/resumelist" element={<ResumeListPage />} />
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
