//LogoutButton.tsx
import { useAuth0 } from "@auth0/auth0-react";

//logout button component
const LogoutButton: React.FC = () => {
    //destructure logout and isAuthenticated from useAuth0 hook
    const { logout, isAuthenticated } = useAuth0();

    //function to handle logout button click
    const handleLogout = () => {
        logout({
        logoutParams: {
            returnTo: window.location.origin,
        },
        });
    };

    //if the user is authenticated, show the logout button
    if(isAuthenticated) return (<button onClick={handleLogout} className="btn">🚪 Log Out</button>)
    return null;
}

export default LogoutButton;