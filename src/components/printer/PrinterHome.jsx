/* eslint-disable react/style-prop-object */
import React, { Component, useState } from "react";
import { Button, Card, Nav, Navbar, NavDropdown, Toast } from "react-bootstrap";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import "./PrinterHome.css";
import axios from "axios";
import Main from "../template/Main";
import ToastNotifications from "../Notifications/NotificationProvider";
import * as Hi from "react-icons/hi";

const headerProps = {
  icon: <Hi.HiOutlinePrinter className="icon" />,
  title: "Impressoras",
  subtitle: "Impressoras",
};

const baseUrl = "http://localhost:3333/printers";
const initialState = {
  active: "default",
  printer: { sn: "", model: "", manufacturer: "", type: "" },
  list: [],
};

export default class PrinterHome extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
      console.log(resp.data);
    });
  }

  // Barra de Navegação teste//

  navBar() {
    console.log();
    return (
      <>
        <Nav
          fill
          variant="pills"
          className="sub-nav"
          activeKey={this.state.active}
          onSelect={(selectedKey) => this.setState({ active: selectedKey })}
        >
          <Nav.Item>
            <Nav.Link eventKey="default">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="entrada">Entrada no Estoque</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }
  // ------------------ //
  cards() {
    return (
      <>
        <hr />
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
      </>
    );
  }

  // Renderizar tabela com lista de impressoras em estoque //
  renderTable() {
    return (
      <>
        <hr />
        <table className="table mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>S/N</th>
              <th>Modelo</th>
              <th>Fabricante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </>
    );
  }
  renderRows() {
    return this.state.list.map((printer) => {
      return (
        <tr key={printer.id}>
          <td>{printer.id}</td>
          <td>{printer.sn}</td>
          <td>{printer.model}</td>
          <td>{printer.manufacturer}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => this.load(printer)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(printer)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }
  // ----------------------------------------------------- //

  // Formulário e dependências //
  updateField(e) {
    const printer = { ...this.state.printer };
    printer[e.target.name] = e.target.value;
    this.setState({ printer });
  }
  getUpdatedList(printer, add = true) {
    const list = this.state.list.filter((u) => u.id !== printer.id);
    if (add) list.push(printer);
    return list;
  }
  save() {
    const printer = this.state.printer;
    const method = printer.id ? "put" : "post";
    const url = printer.id ? `${baseUrl}/${printer.id}` : baseUrl;
    axios[method](url, printer).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ printer: initialState.printer, list });
    });
  }

  remove(printer) {
    axios.delete(`${baseUrl}/${printer.id}`).then((resp) => {
      const list = this.getUpdatedList(printer, false);
      this.setState({ list });
    });
  }
  
  renderForm() {
    return (
      <>
        <hr />
        <div className="form">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>S/N</label>
                <input
                  type="text"
                  className="form-control"
                  name="sn"
                  value={this.state.printer.sn}
                  onChange={(e) => this.updateField(e)}
                  placeholder="Digite o número de série..."
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  name="model"
                  value={this.state.printer.model}
                  onChange={(e) => this.updateField(e)}
                  placeholder="Digite o modelo..."
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Fabricante</label>
                <input
                  type="text"
                  className="form-control"
                  name="manufacturer"
                  value={this.state.printer.manufacturer}
                  onChange={(e) => this.updateField(e)}
                  placeholder="Digite o fabricante..."
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={this.state.printer.type}
                  onChange={(e) => this.updateField(e)}
                  placeholder="Digite o tipo..."
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={(e) => this.save(e)}>
                Salvar
              </button>
              <button
                className="btn btn-secondary ml-2"
                onclick={(e) => this.notifyApp(e)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  // ----------------------------------------------------- //

  notifyApp() {
    toast.success("Sucesso");
    return <ToastContainer />;
  }

  screenSwitcher() {
    switch (this.state.active) {
      case "default":
        return this.renderTable();
        break;

      case "entrada":
        return this.renderForm();
        break;

      default:
        return this.cards();
    }
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.navBar()}
        {this.notifyApp()}

        {this.screenSwitcher()}
      </Main>
    );
  }
}
