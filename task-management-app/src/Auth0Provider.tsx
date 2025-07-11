import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

//Auth0Provider wrapper to handle navigation after login
type Auth0ProviderWithNavigateProps = {
  children: any;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({ children, }) => {
  const navigate = useNavigate();
  const domain = "YOUR-DOMAIN-HERE"; // replace with your Auth0 domain
  const clientId = "YOUR-CLIENTID-HERE"; // replace with your Auth0 client ID;
  const redirectUri = "YOUR-REDIRECT-URI-HERE"; // make sure the port matches your server

  //function to handle redirect after login
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  
  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;