import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./MLayout.module.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.mainLayout}>
        <aside
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.sidebarOpen : ""
          }`}
        >
          <button
            className={styles.sidebarToggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <NavLink to="/home" className={styles.navLink}>
            Create Resume
          </NavLink>
          <NavLink to="/resumelist" className={styles.navLink}>
            My Resumes
          </NavLink>
          <NavLink to="/" className={styles.navLink}>
            Log Out
          </NavLink>
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
