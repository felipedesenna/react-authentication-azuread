/* eslint-disable react/style-prop-object */
import React, { hashHistory, useState, useRef } from "react";
import {
  Button,
  Card,
  Nav,
  Navbar,
  Form,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./PrinterHome.css";
import * as APIConn from "../api/ApiConnector";
import Main from "../template/Main";
import Toast, { ContainerToast } from "../Notifications/NotificationProvider";
import * as Hi from "react-icons/hi";
import * as Ri from "react-icons/ri";

import Header from "../template/Header";

const Navigation = () => {
  const [active, setActive] = useState("default");

  const screenSwitcher = () => {
    switch (active) {
      case "default":
        return <Screen activeKey={active} />;
        break;

      case "entrada":
        // return <ToastNotifications message="Oi" />;
        return <Screen2 />;
        break;

      default:
        return null;
    }
  };

  return (
    <>
      <Nav
        variant="pills"
        className="sub-nav"
        activeKey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="default">Default</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="entrada">Link 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {screenSwitcher()}
    </>
  );
};


const Screen2 = (event) => {
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const [state, setState] = useState();
  const [sn, setSN] = useState();
  const [model, setModel] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [type, setType] = useState();


  const handleSubmit = (event) => {
    const addFormLog = { sn, model, manufacturer, type };
    console.log(addFormLog, validated);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      Toast({ type: "error", msg: "Preencha todos os campos", i: Ri.RiCloseCircleFill });
    } else {
      setValidated(true);
      event.preventDefault();
      Toast({ type: "success", msg: "Cadastro efetuado", i: Ri.RiCheckboxCircleFill });
      handleReset()
      APIConn.save({ path: "printers", obj: addFormLog })
      
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setValidated(false);
  };


  return (
    <>
      <hr />
      <Form ref={formRef} noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="sn">
            <Form.Label>S/N</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setSN(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Digite o S/N..."
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="model">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setModel(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Digite o Modelo..."
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Fabricante</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setManufacturer(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Digite o Fabricante..."
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setType(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="Digite o Tipo..."
            />
          </Form.Group>
        </Form.Row>

        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export const Screen = (props) => {
  const [active, setActive] = useState("default");
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
                value
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
                value
                onChange
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
                value
                onChange
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
                value
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
              onClick={() => Toast({ type: "success", msg: "olá" })}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PrinterHomeV2 = () => {
  const headerProps = {
    icon: <Hi.HiOutlinePrinter className="icon" />,
    title: "Impressoras",
    subtitle: "Impressoras",
  };

  return (
    <>
      <Header {...headerProps} />
      <React.Fragment>
        <main className="content container-fluid">
          <div className="p-3 mt-3">
            <Navigation />
            {/* <ToastContainer /> */}
            <ToastContainer />
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default PrinterHomeV2;
