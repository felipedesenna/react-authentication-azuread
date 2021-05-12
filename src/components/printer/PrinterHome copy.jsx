/* eslint-disable react/style-prop-object */
import React, { Component, useState } from "react";
import { Button, Card, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PrinterHome.css";
import axios from "axios";
import Main from "../template/Main";
import * as Hi from "react-icons/hi";

const NavBar = () => {
  const [active, setActive] = useState("default");
   return (
    <>
      <Nav
        fill
        variant="pills"
        className="sub-nav"
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
        onClick={this._onButtonClick}
        
      >
        <Nav.Item>
          <Nav.Link eventKey="default">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Entrada no Estoque</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};



const headerProps = {
  icon: <Hi.HiOutlinePrinter className="icon" />,
  title: "Impressoras",
  subtitle: "Impressoras",
  navbar: <NavBar />,
};


export default class PrinterHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  cards() {
    return (
      <div
        class="card text-white bg-primary mb-3"
        style={{ maxWidth: "18rem" }}
      >
        <div class="card-header">Header</div>
        <div class="card-body">
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }

  state = {
    render: false,
  };



  render() {
    console.log()
    return (
      <Main {...headerProps}>
        {this.state.clicked ? <NavBar /> : null}
        
        {/* {this.navBar()} */}
      </Main>
    );
  }
}
