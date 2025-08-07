import { Outlet, NavLink } from 'react-router-dom';
// import Header from '../components/common/header/Header';
import styles from './MLayout.module.css'; // Import as CSS Module

const MainLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      {/* <Header /> */}

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <NavLink to="/home" className={styles.navLink}>Create Resume</NavLink>
          <NavLink to="/settings" className={styles.navLink}>My Resumes</NavLink>
          <NavLink to="/" className={styles.navLink}>Log Out</NavLink>
        </aside>

        <main className={styles.content}>
          <Outlet /> {/* This will render child routes */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
