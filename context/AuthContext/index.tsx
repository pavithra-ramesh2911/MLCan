import React, { useContext, createContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import { User } from "../../models/user.model";

export interface AuthState {
  authenticated?: boolean;
  user?: User;
}

type SetAuthState = Dispatch<SetStateAction<AuthState>>;

type AuthContentProps = [AuthState, SetAuthState];

const initialValues: AuthState = {
  authenticated: false,
  user: new User(),
};


const AuthContent: any = createContext({});


const AuthContext = () => {
  const context = useContext<AuthContentProps>(AuthContent);
  if (!context) {
    throw new Error(`useMeContext must be used within a MeContextProvider`);
  }
  const [auth, setAuth] = context;
  
  const setAuthenticated = (user?: User) => {
    setAuth((auth: any) => ({
      ...auth,
      authenticated: true,
      user,
    }));
  };

  const setUnauthenticated = () => {
    localStorage.clearSensitive();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(() => ({
      authenticated: false,
      user: undefined,
    }));
  };

  return {
    ...auth,
    setAuthenticated,
    setUnauthenticated
  };
};

const AuthProvider = (ownProps:any) => {
  const [auth, setAuth] = useState<AuthState>(initialValues);
  const value = useMemo(() => [auth, setAuth], [auth]);
  return <AuthContent.Provider value={value} {...ownProps} />;
}

export { AuthProvider, AuthContext };
