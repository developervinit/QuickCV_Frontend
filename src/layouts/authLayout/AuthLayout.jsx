// src/layouts/AuthLayout.jsx
//Note: currently not using it routes/AppRoute.jsx file
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthLayout.module.css'; // You'll need to create this CSS file

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <Link to="/" className={styles.logo}>
            <h1>QuickCV</h1>
          </Link>
        </div>
        <div className={styles.authContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;













// This layout wraps all authentication-related pages like Login, Signup, Forgot Password, etc.
// import React from 'react';

// const AuthLayout = ({ children }) => {
//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
//       {/* You can add logo here */}
//       {children}
//     </div>
//   );
// };

// export default AuthLayout;



