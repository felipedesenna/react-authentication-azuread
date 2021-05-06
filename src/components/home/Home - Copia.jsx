/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Main from '../template/Main'
import { AiOutlineHome } from "react-icons/ai";

const headerProps = {
    icon: <AiOutlineHome className="icon" />,
    title: 'Início',
    subtitle: 'Segundo Projeto do capítulo de React.'
}
export default props =>

    <Main {...headerProps}>

        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para criação de contas de rede no Active Directory.</p>
    </Main >