//imports

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            <div className={styles.welcomeWindow}>
                <div className={styles.titleBar}>
                    <span>Task Management System v1.0</span>
                    <span>_ □ ✕</span>
                </div>
                <div className={styles.windowContent}>
                    <h1 className={styles.welcomeTitle}>Welcome to the Task Management App</h1>
                    <p className={styles.description}>
                        Manage your tasks efficiently with our Windows 98-style interface. 
                        Create, edit, and track your daily tasks with the classic computing experience.
                    </p>
                    
                    <div className={styles.authSection}>
                        <h3 className={styles.authTitle}>Authentication</h3>
                        <div className={styles.authButtons}>
                            <LoginButton />
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}