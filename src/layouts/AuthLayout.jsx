// This layout wraps all authentication-related pages like Login, Signup, Forgot Password, etc.
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      {/* You can add logo here */}
      {children}
    </div>
  );
};

export default AuthLayout;

// How it's used in other component:
// <AuthLayout>
//   <Signup />
// </AuthLayout>

// Typical usage in AppRoutes.jsx
// <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
// <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />

