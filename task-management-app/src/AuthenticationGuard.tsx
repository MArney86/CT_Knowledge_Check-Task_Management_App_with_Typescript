//AuthenticationGuard.tsx
import { withAuthenticationRequired } from "@auth0/auth0-react";

//props for the AuthenticationGuard component
type AuthenticationGuardProps = {
    component: React.ReactNode | any;
}

// AuthenticationGuard component that wraps the provided component with authentication check
const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({component})=>{
    const Component = withAuthenticationRequired(component,{
        onRedirecting: () => <div>Redirecting you to the login page...</div>,
    })

    return(
        <Component />
    )
}

export default AuthenticationGuard;