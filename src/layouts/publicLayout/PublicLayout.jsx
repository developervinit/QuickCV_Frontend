// src/layouts/PublicLayout.jsx\
//Note: currently not using it routes/AppRoute.jsx file
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PublicLayout.module.css'; // You'll need to create this CSS file

const PublicLayout = ({ children }) => {
  return (
    <div className={styles.publicLayout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <h1>QuickCV</h1>
          </Link>
          <nav className={styles.nav}>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/signup" className={styles.navLink}>Sign Up</Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
