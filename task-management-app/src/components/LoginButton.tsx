import { useAuth0 } from "@auth0/auth0-react";

//login button component
const LoginButton: React.FC = () => {
  //destructure loginWithRedirect and isAuthenticated from useAuth0 hook
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  //function to handle login button click
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

  //if the user is not authenticated, show the login button
  if(!isAuthenticated) return (<button onClick={handleLogin} className="btn">🔑 Log In</button>)
  return null;
};

export default LoginButton;