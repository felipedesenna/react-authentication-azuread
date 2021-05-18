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
import Modal, { MyVerticallyCenteredModal } from "./modals/PrinterEditModal";
import { PrtModOptions } from "./modals/PrinterOptionsModal";
import * as Hi from "react-icons/hi";
import * as Ri from "react-icons/ri";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";
import PrtManager from "./components/PrinterManager";

import Header from "../template/Header";

const Navigation = (props) => {
  const [active, setActive] = useState("default");

  const screenSwitcher = (props) => {
    switch (active) {
      case "default":
        return <PrtManager />;
      case "production":
        return <Dashboard />;
      case "entrada":
        // return <ToastNotifications message="Oi" />;
        return <FormEntradaPRT />;
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
          <Nav.Link eventKey="default">Gerenciar</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="entrada">Entrada em Estoque</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="history">Histórico</Nav.Link>
        </Nav.Item>
      </Nav>
      {screenSwitcher(props)}
    </>
  );
};

const FormEntradaPRT = (event) => {
  const [validated, setValidated] = useState(false);
  const { accountInfo } = useAuth();
  const formRef = useRef(null);
  const toastId = useRef(null);
  const [sn, setSN] = useState();
  const [model, setModel] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [type, setType] = useState();
  const status = "BACKUP";
  const last_technician_update = accountInfo.user.email;

  const handleSubmit = (event) => {
    const addFormLog = {
      sn,
      model,
      manufacturer,
      type,
      status,
      last_technician_update,
    };
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
          switchToast(res.data);
        })
        .catch((e) => {
          Toast({
            type: "error",
            msg: "Bad Request",
            i: Ri.RiCloseCircleFill,
          });
          console.log(e);
        });
      axiosToast({
        tstId: toastId,
        msg: `Aguarde...`,
        i: Ri.RiLoader2Fill,
      });
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setValidated(false);
  };

  const switchToast = (res) => {
    switch (res.statusCode) {
      case 110:
        axiosToastUpdate({
          tstId: toastId,
          msg: `Equipamento Cadastrado com Sucesso`,
          i: Ri.RiCheckboxCircleFill,
          type: toast.TYPE.SUCCESS,
        });
        handleReset();
        break;
      case 111:
        axiosToastUpdate({
          tstId: toastId,
          msg: `Equipamento '${res.printer.sn}' já consta cadastrado na base`,
          i: Ri.RiAlertFill,
          type: toast.TYPE.ERROR,
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
  const [prt, setPrt] = useState({});
  const [prtModEditShow, setPrtModEditShow] = React.useState(false);
  const [prtOptEditShow, setPrtOptEditShow] = React.useState(false);
  const toastId = useRef(null);

  useEffect(() => {
    prtListAPI();
  }, []);

  console.log(prt);

  const prtListAPI = () => {
    APIConn.getPrtList({ path: "printers" })
      .then((res) => {
        setList(res.data);
        axiosToastUpdate({
          tstId: toastId,
          msg: `Lista carregada`,
          i: Ri.RiCheckboxCircleFill,
          type: toast.TYPE.SUCCESS,
        });
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

  const updPrtListAPI = () => {
    APIConn.getPrtList({ path: "printers" })
      .then((res) => {
        setList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const delPrtAPI = (prt) => {
    APIConn.deletePrt({ path: "printers", ...prt })
      .then((res) => {
        axiosToastUpdate({
          tstId: toastId,
          msg: `Item Removido`,
          i: Ri.RiCheckboxCircleFill,
          type: toast.TYPE.SUCCESS,
        });
        updPrtListAPI();
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
    alert(prtModEditShow);
    console.log(obj);

    return (
      <MyVerticallyCenteredModal
        show={prtModEditShow}
        onHide={() => setPrtModEditShow(false)}
      />
    );
  };

  const renderRows = (list, index) => {
    console.log(list);
    return (
      <tr key={index}>
        <td>{list.id}</td>
        <td>{list.sn}</td>
        <td>{list.model}</td>
        <td>{list.manufacturer}</td>
        <td>{list.status}</td>
        <td>
          <button
            className="btn btn-outline-primary mr-2"
            onClick={() => {
              setPrtOptEditShow(true);
              setPrt(list);
            }}
          >
            <i className="fa fa-wrench"></i>
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setPrtModEditShow(true);
              setPrt(list);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-outline-danger ml-2"
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
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* {list && list.map(renderRows)} */}
          {list.map(renderRows)}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={prtModEditShow}
        onHide={() => setPrtModEditShow(false)}
        id={prt.id}
        sn={prt.sn}
        model={prt.model}
        manufacturer={prt.manufacturer}
        type={prt.type}
        updList={updPrtListAPI}
      />
      <PrtModOptions
        show={prtOptEditShow}
        onHide={() => setPrtOptEditShow(false)}
        id={prt.id}
        sn={prt.sn}
        model={prt.model}
        manufacturer={prt.manufacturer}
        type={prt.type}
        status={prt.status}
        updList={updPrtListAPI}
        prtList={list}
      />
    </>
  );
};

const PrinterHomeV2 = (props) => {
  const headerProps = {
    icon: <Hi.HiOutlinePrinter className="icon" />,
    title: "Impressoras",
    subtitle: "Visão geral, entrada em estoque e gerenciamento",
  };

  return (
    <>
      <Header {...headerProps} />
      <React.Fragment>
        <main className="content container-fluid">
          <div className="p-3 mt-3">
            <Navigation />
            <ToastContainer />
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default PrinterHomeV2;
