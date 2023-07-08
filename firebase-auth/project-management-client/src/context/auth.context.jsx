import { createContext, useState, useEffect } from 'react';
import {
  auth,
  getAdditionalInfo,
  signInWithGoogle
} from '../config/firebase.config';
import { signupGoogle } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyUser = () => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        setUser(null);
        setIsLoggedIn(false);
      } else if (
        user.providerData.length &&
        user.providerData[0].providerId === 'google.com'
      ) {
        setUser({
          name: user.displayName,
          email: user.email
        });
        setIsLoggedIn(true);
        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);
      } else {
        const { claims } = await user.getIdTokenResult();
        setUser({
          name: claims.name,
          email: claims.email
        });
        setIsLoggedIn(true);
        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);
      }

      setIsLoading(false);
    });
  };

  const handleGoogleAuthentication = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const additionalInfo = getAdditionalInfo(userCredential);
      if (additionalInfo.isNewUser) {
        await signupGoogle({
          name: userCredential.user.displayName,
          email: userCredential.user.email
        });
      }
    } catch (error) {
      console.log('Error authenticating with Google', error);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
    auth.signOut();
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    verifyUser();
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logOutUser,
        handleGoogleAuthentication
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
