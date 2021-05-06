import React from 'react';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';
import './index.css'
import '../../assets/styles.css';

import Routes from '../../routes/RoutesAuth'
import Logo from '../../components/template/Logo'
import Nav from '../../components/template/Nav'
import Footer from '../../components/template/Footer'
import { BrowserRouter } from 'react-router-dom';

const Dashboard = () => {
  const { signOut, accountInfo } = useAuth();

  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
