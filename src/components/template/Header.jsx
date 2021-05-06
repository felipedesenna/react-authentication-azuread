import React from 'react';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';
import '../../assets/styles.css';

const Dashboard = (props) => {
    const { signOut, accountInfo } = useAuth();

    return (

        <header className="header d-none d-sm-flex flex-column">
            <h1 className="mt-3">
                {props.icon} {props.title}
                <div className="accountinfo">
                    <p>Bem-vindo,
                        <strong> {accountInfo.user.displayName}</strong>
                    <button type="button" className="botao App-button " onClick={signOut}>sair</button>
                    </p>
                </div>
            </h1>


            <p className="lead text-muted">{props.subtitle}</p>
        </header>

    );
};

export default Dashboard;
