import {  useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function NavigationBar() {
    return (
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tasks">Tasks</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
          <LoginButton />
          <LogoutButton />
        </nav>
    );
}