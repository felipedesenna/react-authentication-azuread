/* eslint-disable react/style-prop-object */
import React, { Component, useState } from "react";
import { Button, Card, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PrinterHome.css";
import axios from "axios";
import Main from "../template/Main";

import * as Hi from "react-icons/hi";

const navBarHeader = () => {
  return (
    <Card className="card">
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
    </Card>
  );
};

const headerProps = {
  icon: <Hi.HiOutlinePrinter className="icon" />,
  title: "Impressoras",
  subtitle: "Impressoras",
};
const navbar = {navbar: navBarHeader(),}

export default class PrinterHome extends Component {
  navBar() {
    
    const { location } = this.props;  //add this
    const [active, setActive] = this.setState('default');
    
    console.log(location)
    return (
      <Nav variant="pills" activeKey={active}
      onSelect={(selectedKey) => setActive(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="1" href="/printers">
            NavLink 1 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" href="/create" title="Item">
            NavLink 2 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" disabled>
            NavLink 3 content
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
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

  render() {
    return <Main {...headerProps}{ ...navbar}>
      {this.cards()}
      {this.navBar()}
      </Main>;
  }
}
