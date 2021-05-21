import React, {
  hashHistory,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
import {
  Button,
  Form,
  Col,
  Modal,
  Card,
  ButtonToolbar,
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

const PrtMove = (props) => {
  const { accountInfo } = useAuth();
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const toastId = useRef(null);
  const [tkt_glpi, setTktGlpi] = useState();
  const [date_of_service, setDateOfService] = useState();
  const [printer_location_point_a, setPrinterLocationPointA] = useState();
  const [printer_location_point_b, setPrinterLocationPointB] = useState();
  const [sn_printer_point_b, setSNPrinterPointB] = useState([]);
  const [printer_connection_method_point_a, setConnMethodPointA] = useState("");
  const [printer_connection_method_point_b, setConnMethodPointB] = useState("");

  const last_technician_update = accountInfo.user.email;

  const prtList = props.prtList;

  function filterByID(obj) {
    if ("sn" in obj && obj.sn === sn_printer_point_b.toString()) {
      return true;
    }
  }

  function excludePrtFromOptionsList(obj) {
    if ("status" in obj && obj.status === "PRODUCTION") {
      return true;
    }
  }

  const id_printer_point_b = prtList
    .filter(filterByID)
    .map((id) => id.id)
    .toString();

  const options = prtList
    .filter(excludePrtFromOptionsList)
    .map((obj) => obj.sn)
    .filter((lista) => lista !== props.sn);

  const lista = prtList.map((sn) => sn.sn);

  const radiosConnectionMethod = [
    { name: "USB", value: "usb" },
    { name: "Ethernet", value: "ethernet" },
  ];

  const handleSubmit = (event) => {
    const addFormLog = {
      tkt_glpi,
      date_of_service,
      printer_location_point_a,
      printer_location_point_b,
      id_printer_point_b,
      printer_connection_method_point_a,
      printer_connection_method_point_b,
      last_technician_update,
    };

    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      printer_connection_method_point_a === "" ||
      printer_connection_method_point_b === ""
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      console.log(addFormLog);
      Toast({
        type: "error",
        msg: "Preencha todos os campos",
        i: Ri.RiCloseCircleFill,
      });
    } else {
      setValidated(true);
      event.preventDefault();
      console.log(addFormLog);
      APIConn.movePrt({ path: "printers", obj: addFormLog, id: props.id })
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
          msg: `Movimentação realizada com sucesso`,
          i: Ri.RiCheckboxCircleFill,
          type: toast.TYPE.SUCCESS,
        });
        break;
      case 111:
        axiosToastUpdate({
          tstId: toastId,
          msg: `Erro ao registrar a movimentação do equipamento '${res.printer.sn}'`,
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
            Movimentação de Equipamentos
          </Card.Title>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="tktGLPI">
            <Form.Label>Ticket GLPI</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setTktGlpi(e.target.value);
              }}
              placeholder="Digite o Ticket do GLPI..."
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

        <hr />
        <Form.Row>
          <h5 className="ml-1 mt-2 mb-4 text-muted">Ponto A</h5>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4" controlId="sn_printer_point_a">
            <Form.Label>S/N</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Digite o Setor..."
              value={props.sn}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="location_printer_point_a">
            <Form.Label>Setor</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setPrinterLocationPointA(e.target.value);
              }}
              placeholder="Digite o setor de origem..."
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            controlId="connection_method_printer_point_a"
          >
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
                    checked={printer_connection_method_point_a === radio.value}
                    onChange={(e) => setConnMethodPointA(e.currentTarget.value)}
                    variant="outline-primary"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </Form.Group>
        </Form.Row>
        <hr />
        <Form.Row>
          <h5 className="ml-1 mt-2 mb-4 text-muted">Ponto B</h5>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4" controlId="sn_printer_point_b">
            <Form.Label>S/N</Form.Label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setSNPrinterPointB}
              options={options}
              placeholder="Selecione o S/N do equipamento instalado..."
              selected={sn_printer_point_b}
              inputProps={{ required: true }}
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="location_printer_point_b">
            <Form.Label>Setor</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => {
                setPrinterLocationPointB(e.target.value);
              }}
              placeholder="Digite o setor de destino..."
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            controlId="connection_method_printer_point_b"
          >
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
                    checked={printer_connection_method_point_b === radio.value}
                    onChange={(e) => setConnMethodPointB(e.currentTarget.value)}
                    variant="outline-primary"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
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

export default PrtMove;
