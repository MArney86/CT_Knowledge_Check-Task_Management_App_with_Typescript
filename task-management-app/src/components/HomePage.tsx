//imports

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to the Task Management App</h1>
            <LoginButton />
            <LogoutButton />
        </div>
    );
}