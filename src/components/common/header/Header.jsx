import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleRedirect = (pageName) => {
    navigate(`/${pageName}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>Q</div>
        <span>QuickCV</span>
      </div>

      {/* <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>
          Home
        </a>
        <a href="#" className={styles.navLink}>
          Resume
        </a>
        <a href="#" className={styles.navLink}>
          Cover Letter
        </a>
        <a href="#" className={styles.navLink}>
          Prices
        </a>
      </nav> */}

      <div className={styles.actions}>
        <button
          className={styles.signIn}
          onClick={() => handleRedirect("login")}
        >
          Login
        </button>
        <button
          className={styles.orderBtn}
          onClick={() => handleRedirect("signup")}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
