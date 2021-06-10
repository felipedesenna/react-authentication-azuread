import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/images/logotriangle.svg';
import '../../assets/styles.css';

const SignIn = () => {
  const { signIn } = useAuth();

  const handleSignIn = useCallback(() => {
    const accessToken = localStorage.getItem('@AzureAd:accessToken');

    if (!accessToken) {
      signIn();
    }
  }, [signIn]);

  return (
    <div className="App">
      <img src={logo} alt="ReactJS, Azure AD" className="App-logo" />

      <button type="button" onClick={handleSignIn}>Entrar com AzureAD
      
       </button>
    </div>
  );
};

export default SignIn;