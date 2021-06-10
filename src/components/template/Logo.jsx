/* eslint-disable import/no-anonymous-default-export */
import './Logo.css'
import logo from '../../assets/images/logo2.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
<aside className="logo">
    <Link to="/dashboard" className="logo">
        <img src={logo} alt="logo"/>
    </Link>
</aside>