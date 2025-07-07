import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
    return (
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink}>Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="/tasks" className={styles.navLink}>Tasks</a>
            </li>
            <li className={styles.navItem}>
              <a href="/profile" className={styles.navLink}>Profile</a>
            </li>
          </ul>
          <div className={styles.authButtons}>
            <LoginButton />
            <LogoutButton />
          </div>
        </nav>
    );
}