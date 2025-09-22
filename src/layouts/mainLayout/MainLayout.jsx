//src/layouts/mainLayout/MainLayout.jsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authThunks";
import UserInfo from "../../components/userInfo/UserInfo";
import Logo from "../../components/logo/Logo";
import styles from "./MLayout.module.css";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if backend fails, we still want to log out locally
      navigate("/login");
    }
  };

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
          <Logo />
          <UserInfo name={true} image={true} imageSize="large" nameSize="large" />
          <NavLink to="/home" className={styles.navLink}>
            Create Resume
          </NavLink>
          <NavLink to="/resumelist" className={styles.navLink}>
            My Resumes
          </NavLink>
          <div className={styles.container}>
            <div className={styles.userMenu}>
              {user && (
                <div className={styles.userInfo}>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
