/* eslint-disable import/no-anonymous-default-export */
import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Hi  from "react-icons/hi";
import * as Bs from "react-icons/bs";

export default props =>
<aside className="menu-area">
    <nav className="menu">
        {/* Refatorar em casa! */}
        <Link to="/dashboard">
            <Hi.HiOutlineHome/> Início
        </Link>
        <Link to="/create">
            <Hi.HiOutlineUserAdd/>  Usuários
        </Link>
        <Link to="/printers">
            <Hi.HiOutlinePrinter/> Impressoras
        </Link>
    </nav>
</aside>