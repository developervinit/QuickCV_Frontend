import styles from "./Header.module.css"

function Header() {
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
        <button className={styles.signIn}>Login</button>
        <button className={styles.orderBtn}>Sign Up</button>
      </div>
    </header>
  )
}

export default Header
