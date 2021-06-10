import React from 'react';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';
import '../../assets/styles.css';

const Dashboard = () => {
  const { signOut, accountInfo } = useAuth();

  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="ReactJS, Azure AD" className="App-logo" />

        <div>
          <p>Bem-vindo,
            <strong> {accountInfo.user.displayName}</strong>
          </p>
        </div>

        <button type="button" className="App-button" onClick={signOut}>sair</button>
      </header>
    </div>
  );
};

export default Dashboard;
