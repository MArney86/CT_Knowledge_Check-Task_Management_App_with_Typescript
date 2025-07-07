//LogoutButton.tsx
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if(isAuthenticated) return (<button onClick={handleLogout} className="btn">🚪 Log Out</button>)
  return null;
}

export default LogoutButton;