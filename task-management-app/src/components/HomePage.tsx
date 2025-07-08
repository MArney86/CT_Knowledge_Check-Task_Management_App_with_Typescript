//imports

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function HomePage() {
    return (
        <div className="homePage">
            <div className="welcomeWindow">
                <div className="titleBar">
                    <span>Task Management System v1.0</span>
                    <span>_ □ ✕</span>
                </div>
                <div className="windowContent padding">
                    <h1 className="welcomeTitle">Welcome to the Task Management App</h1>
                    <p className="description">
                        Manage your tasks efficiently with our Windows 98-style interface. 
                        Create, edit, and track your daily tasks with the classic computing experience.
                    </p>
                    
                    <div className="authSection">
                        <h3 className="authTitle">Authentication</h3>
                        <div className="authButtons">
                            <LoginButton />
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}