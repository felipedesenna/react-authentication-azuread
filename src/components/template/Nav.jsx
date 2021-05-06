/* eslint-disable import/no-anonymous-default-export */
import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUserAdd, AiOutlineHome }  from "react-icons/ai";

export default props =>
<aside className="menu-area">
    <nav className="menu">
        {/* Refatorar em casa! */}
        <Link to="/dashboard">
            <AiOutlineHome/> Início
        </Link>
        <Link to="/create">
            <AiOutlineUserAdd/> Usuários
        </Link>
    </nav>
</aside>