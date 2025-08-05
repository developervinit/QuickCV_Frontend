import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage/LoginPage';
import SignupPage from '../pages/signupPage/SignupPage';
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/" element={<LandingPage />}/>
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
