/* eslint-disable import/no-anonymous-default-export */
import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown, Navbar, Collapse, Drawer } from "react-bootstrap";
import * as Hi from "react-icons/hi";
import * as Bs from "react-icons/bs";

export default (props) => {
  return (
    <>
      <aside className="menu-area">
        <nav className="menu">
          {/* Refatorar em casa! */}
          <Link to="/dashboard">
            <Hi.HiOutlineHome /> Início
          </Link>
          <Link to="/create">
            <Hi.HiOutlineUserAdd /> Usuários
          </Link>
          <Link to="/printers">
            <Hi.HiOutlinePrinter /> Impressoras
          </Link>
          <Link to="/printers2">
            <Hi.HiOutlinePrinter /> Suprimentos
          </Link>
        </nav>
      </aside>
    </>
  );
};
