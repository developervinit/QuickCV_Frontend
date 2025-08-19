import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className={styles.linkDecoration} to="/">
      <div className={styles.logo}>
        <div className={styles.logoIcon}>Q</div>
        <span>QuickCV</span>
      </div>
    </Link>
  );
};

export default Logo;
