import React, { hashHistory, useState, useRef, useEffect } from "react";
import {
  Button,
  Form,
  Col,
  Modal,
  Card,
  Fragment,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import {
  Typeahead,
  Highlighter,
  Menu,
  MenuItem,
} from "react-bootstrap-typeahead";
import * as APIConn from "../../api/ApiConnector";
import Toast, {
  axiosToast,
  axiosToastUpdate,
} from "../../Notifications/NotificationProvider";
import * as Ri from "react-icons/ri";
import { toast } from "react-toastify";
import { range } from "lodash";
import { useAuth } from "../../../hooks/auth";

// const options = range(0, 1000).map(o => `Option ${o.toString()}`);

const PrtRepair = (props) => {
  const { accountInfo } = useAuth();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const toastId = useRef(null);
  const [tkt_glpi, setTktGlpi] = useState();
  const [date_of_service, setDateOfService] = useState();
  const [location, setLocation] = useState();
  const [problem_reported, setProblemReported] = useState();
  const [printer_connection_method, setConnMethodValue] = useState("");
  const last_technician_update = accountInfo.user.email;

  const radiosConnectionMethod = [
    { name: "USB", value: "usb" },
    { name: "Ethernet", value: "ethernet" },
  ];

  const handleSubmit = (event) => {
    const addFormLog = {
      tkt_glpi,
      date_of_service,
      location,
      problem_reported,
      printer_connection_method,
      status_printer: "DEFECT",
      last_technician_update,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false || printer_connection_method === "") {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      Toast({
        type: "error",
        msg: "Preencha todos os campos",
        i: Ri.RiCloseCircleFill,
      });
      console.log(addFormLog)
    } else {
      setValidated(true);
      event.preventDefault();
      APIConn.repairPrt({ path: "printers", obj: addFormLog, id: props.id })
        .then((res) => {
          switchToast(res.data);
          props.updList();
          props.onHide();
          handleReset();
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
          msg: `Reparo solicitado com sucesso`,
          i: Ri.RiCheckboxCircleFill,
          type: toast.TYPE.SUCCESS,
        });
        break;
      case 111:
        axiosToastUpdate({
          tstId: toastId,
          msg: `Reparo já solicitado para o equipamento '${res.printer.sn}'`,
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
          <Card.Title className="ml-1 mt-2 mb-4 text-muted">
            Reparo sem substituição
          </Card.Title>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="tktGLPI">
            <Form.Label>Ticket GLPI</Form.Label>
            <Form.Control
              type="number"
              min={16000}
              required
              onChange={(e) => {
                setTktGlpi(e.target.value);
              }}
              placeholder="Digite o ticket do GLPI..."
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="date">
            <Form.Label>Data do atendimento</Form.Label>
            <Form.Control
              type="date"
              required
              onChange={(e) => {
                setDateOfService(e.target.value);
              }}
              placeholder="Digite o Modelo..."
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4" controlId="sn">
            <Form.Label>S/N</Form.Label>
            <Form.Control
              type="text"
              required
              value={props.sn}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="place">
            <Form.Label>Setor</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder="Digite o setor..."
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="sector">
            <Form.Label>Conexão</Form.Label>
            <div className="d-flex justify-content-center flex-fill">
              <ButtonGroup
                className="d-flex justify-content-center flex-fill"
                toggle
              >
                {radiosConnectionMethod.map((radio, index) => (
                  <ToggleButton
                    key={index}
                    type="radio"
                    name="radio"
                    value={radio.value}
                    checked={printer_connection_method === radio.value}
                    onChange={(e) => setConnMethodValue(e.currentTarget.value)}
                    variant="outline-primary"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="problemFound">
            <Form.Label>Problema apresentado</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              onChange={(e) => {
                setProblemReported(e.target.value);
              }}
              placeholder="Descreva o defeito apresentado..."
            />
          </Form.Group>
        </Form.Row>

        <hr />
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit" className="ml-2">
            Salvar
          </Button>
          <Button variant="secondary" onClick={props.onHide} className="ml-2">
            Cancelar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PrtRepair;
