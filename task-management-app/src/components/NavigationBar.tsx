import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function NavigationBar() {
    return (
        <nav className="navbar">
          <ul className="navList">
            <li className="navItem">
              <a href="/" className="navLink">Home</a>
            </li>
            <li className="navItem">
              <a href="/tasks" className="navLink">Tasks</a>
            </li>
            <li className="navItem">
              <a href="/profile" className="navLink">Profile</a>
            </li>
          </ul>
          <div className="authButtons">
            <LoginButton />
            <LogoutButton />
          </div>
        </nav>
    );
}