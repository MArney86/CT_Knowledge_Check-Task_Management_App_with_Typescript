import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/tasks",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  if(!isAuthenticated) return (<Button onClick={handleLogin}>Log In</Button>)
  return null;
};

export default LoginButton;