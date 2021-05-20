import React, { hashHistory, useState, useRef, useEffect } from "react";
import { Button, Form, Col, Modal, Card, Nav } from "react-bootstrap";
import * as APIConn from "../../api/ApiConnector";
import Toast, {
  axiosToast,
  axiosToastUpdate,
} from "../../Notifications/NotificationProvider";
import * as Ri from "react-icons/ri";
import { toast } from "react-toastify";

import "./PrinterOptionsModal.css";

import PrtReplace from "../components/PrinterReplace";
import PrtMove from "../components/PrinterMove";

export const PrtModOptions = (props) => {
  const [active, setActive] = useState(false);
  const [submit, setSubmit] = useState();
  const [list, setList] = useState([]);
  const [disableReplaceOption, setDisableReplaceOption] = useState(false);

  // const LoadPrtReplace = (props) => {
  //   console.log(props.status);
  //   setDisableReplaceOption(true);
  //   if (active === "replace") {
  //     if (props.status === "DEFECT") {
  //       return (
  //         <div>
  //           <h4>
  //             Equipamento com defeito, não é possível realizar substituição.
  //           </h4>
  //         </div>
  //       );
  //     } else {
  //       // setDisableReplaceOption(false);
  //       return <PrtReplace {...props} />;
  //     }
  //   } else {
  //     return null;
  //   }
  // };
  const LoadPrtReplace = (props) => {
    if (active === "replace") {
      // setDisableReplaceOption(false);
      return <PrtReplace {...props} />;
    } else if (active === "move") {
      // setDisableReplaceOption(false);
      return <PrtMove {...props} />;
    } else {
      return null;
    }
  };

  return (
    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Gerenciar Equipamento
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{`${props.manufacturer} - ${props.model}`}</h4>
        <h6>{`S/N ${props.sn}`}</h6>
        <hr />
        {/* <FormEditPrt {...props} /> */}

        <Card bg="light">
          <Card.Header>
            <Nav
              justify
              variant="pills"
              activeKey={active}
              onSelect={(selectedKey) => setActive(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link
                  disabled={
                    props.status === "DEFECT" || props.status === "BACKUP"
                      ? true
                      : false
                  }
                  eventKey="replace"
                >
                  Substituição
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={
                    props.status === "DEFECT" || props.status === "BACKUP"
                      ? true
                      : false
                  }
                  eventKey="move"
                >
                  Movimentação
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  disabled={props.status === "DEFECT" ? true : false}
                  eventKey="repair"
                >
                  Reparo
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {active ? (
            <Card.Body>
              <LoadPrtReplace {...props} />

              {/* {active === "replace" ? <PrtReplace {...props} /> : null} */}
            </Card.Body>
          ) : null}
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export const FormEditPrt = (props) => {
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const toastId = useRef(null);
  const [id, setID] = useState(props.id);
  const [sn, setSN] = useState(props.sn);
  const [model, setModel] = useState(props.model);
  const [manufacturer, setManufacturer] = useState(props.manufacturer);
  const [type, setType] = useState(props.type);
  console.log(props);

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
      APIConn.alterPrt({ path: "printers", id: id, obj: addFormLog })
        .then((res) => {
          switchToast(res.data);
          props.updList();
          props.onHide();
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
          msg: `Equipamento editado com Sucesso`,
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
              readOnly
              type="text"
              required
              onChange={(e) => {
                setSN(e.target.value);
              }}
              value={sn}
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
              value={model}
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
              value={manufacturer}
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
              value={type}
              placeholder="Digite o Tipo..."
            />
          </Form.Group>
        </Form.Row>
        <hr />
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit" className="ml-2">
            Cadastrar
          </Button>
          <Button variant="secondary" onClick={props.onHide} className="ml-2">
            Cancelar
          </Button>
        </div>
      </Form>
    </>
  );
};

const AppModal = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <PrtModOptions show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default AppModal;
