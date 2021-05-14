/* eslint-disable react/style-prop-object */
import React, { hashHistory, useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Nav,
  Navbar,
  Form,
  Col,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "./PrinterHome.css";
import * as APIConn from "../api/ApiConnector";
import Main from "../template/Main";
import Toast, {
  axiosToast,
  axiosToastUpdate,
} from "../Notifications/NotificationProvider";
import * as Hi from "react-icons/hi";
import * as Ri from "react-icons/ri";

import Header from "../template/Header";

const Navigation = () => {
  const [active, setActive] = useState("default");

  const screenSwitcher = () => {
    switch (active) {
      case "default":
        return <Dashboard />;
        break;

      case "entrada":
        // return <ToastNotifications message="Oi" />;
        return <FormEntradaPRT />;
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
          <Nav.Link eventKey="default">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="entrada">Entrada</Nav.Link>
        </Nav.Item>
      </Nav>

      {screenSwitcher()}
    </>
  );
};

const FormEntradaPRT = (event) => {
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const [sn, setSN] = useState();
  const [model, setModel] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [type, setType] = useState();

  const handleSubmit = (event) => {
    const addFormLog = { sn, model, manufacturer, type };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      Toast({
        type: "error",
        msg: "Preencha todos os campos",
        i: Ri.RiCloseCircleFill,
      });
    } else {
      setValidated(true);
      event.preventDefault();
      APIConn.savePrt({ path: "printers", obj: addFormLog })
        .then((res) => {
          axiosToast(res.data);
        })
        .catch((e) => {
          Toast({
            type: "error",
            msg: "Bad Request",
            i: Ri.RiCloseCircleFill,
          });
          console.log(e);
        });
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setValidated(false);
  };

  const axiosToast = (res) => {
    switch (res.statusCode) {
      case 110:
        Toast({
          type: "success",
          msg: `Equipamento cadastrado com sucesso`,
          i: Ri.RiCheckboxCircleFill,
        });
        handleReset();
        break;
      case 111:
        Toast({
          type: "error",
          msg: `Equipamento '${res.printer.sn}' já consta cadastrado na base`,
          i: Ri.RiErrorWarningFill,
        });
        break;

      default:
        return null;
    }
  };

  return (
    <>
      <hr />
      <Form
        ref={formRef}
        noValidate
        validated={validated}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="sn">
            <Form.Label>S/N</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setSN(e.target.value);
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

const Screen = (props) => {
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

const Dashboard = (event) => {
  const [list, setList] = useState([]);
  const toastId = useRef(null);

  useEffect(() => {
    prtListAPI();
  }, []);

  const prtListAPI = () => {
    APIConn.getPrtList({ path: "printers" })
      .then((res) => {
        setList(res.data);
        setTimeout(
          axiosToastUpdate({
            tstId: toastId,
            msg: `Carreguei`,
            i: Ri.RiCheckboxCircleFill,
          }),
          1000
        );
      })
      .catch((e) => {
        console.log(e);
      });
    //Toast carregando
    axiosToast({
      tstId: toastId,
      msg: `Carregando lista...`,
      i: Ri.RiLoader2Fill,
    });
  };

  const delPrtAPI = (prt) => {
    APIConn.deletePrt({ path: "printers", ...prt })
      .then((res) => {
        axiosToastUpdate({
          tstId: toastId,
          msg: `Item Removido`,
          i: Ri.RiCheckboxCircleFill,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    //Toast carregando
    axiosToast({
      tstId: toastId,
      msg: `Removendo item...`,
      i: Ri.RiLoader2Fill,
    });
  };

  const consoleTeste = (obj) => {
    alert(obj);
    console.log(obj);
  };

  const renderRows = (list, index) => {
    return (
      <tr key={index}>
        <td>{list.id}</td>
        <td>{list.sn}</td>
        <td>{list.model}</td>
        <td>{list.manufacturer}</td>
        <td>
          <button className="btn btn-warning">
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => delPrtAPI(list)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Table className="mt-3" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>S/N</th>
            <th>Modelo</th>
            <th>Fabricante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* {list && list.map(renderRows)} */}
          {list.map(renderRows)}
        </tbody>
      </Table>
      <Button onClick={consoleTeste}>Clicar</Button>
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
