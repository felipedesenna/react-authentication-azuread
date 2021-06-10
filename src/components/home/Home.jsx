/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Main from '../template/Main'
import * as Hi  from "react-icons/hi";

const headerProps = {
    icon: <Hi.HiOutlineHome className="icon" />,
    title: 'Início',
    subtitle: 'Segundo Projeto do capítulo de React.'
}
export default props =>

    <Main {...headerProps}>

        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para Gerenciamento do Parque de Equipamentos</p>
    </Main >