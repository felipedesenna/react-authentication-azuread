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
  Card,
  InputGroup,
  Badge,
  Table,
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
import Modal, { MyVerticallyCenteredModal } from "../modals/PrinterEditModal";
import { PrtModOptions } from "../modals/PrinterOptionsModal";

const arr = ["PRODUCTION", "BACKUP", "DEFECT", "COLLECTED"];

const PrtManager = (props) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedSN, setSelectedSN] = useState([]);
  const [snDisabled, setSnDisabled] = useState(false);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [prtModEditShow, setPrtModEditShow] = useState(false);
  const [prtOptEditShow, setPrtOptEditShow] = useState(false);
  const [selectedPrt, setSelectedPrt] = useState({});
  const toastId = useRef(null);
  const formRef = useRef(null);
  const [printerList, setPrinterList] = useState([]);

  useEffect(() => {
    PrtListAPI();
  }, []);

  const PrtListAPI = () => {
    APIConn.getPrtList({ path: "printers" })
      .then((res) => {
        setPrinterList(res.data);
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

  const clicar = () => {
    // PrtListAPI();
    console.log(prtListOnProdOptions);
  };

  const filterPrtStatus_Production = (obj) => {
    // if ("status" in obj && obj.status === "PRODUCTION") {
    if ("status" in obj) {
      return true;
    }
  };

  const prtListOnProdOptions = printerList
    .filter(filterPrtStatus_Production)
    .map((obj) => obj.sn);

  const filterPrtGetSelected = (obj) => {
    if ("sn" in obj && obj.sn === selectedSN.toString()) {
      return true;
    }
  };
  const prtGetSelected = printerList
    .filter(filterPrtGetSelected)
    .map((obj) => obj);

  const filterStatusGetSelected = (obj) => {
    if ("status" in obj && obj.status === selectedStatus.toString()) {
      return true;
    }
  };

  const statusGetSelected = printerList
    .filter(filterStatusGetSelected)
    .map((obj) => obj);

  const TableEquipmentOptions = (props) => {
    const renderRows = (list, index) => {
      return (
        <tr key={index}>
          <td>{list.id}</td>
          <td>{list.sn}</td>
          <td>{list.model}</td>
          <td>{list.manufacturer}</td>
          <td>{list.status}</td>
          <td>{list.status}</td>
          <td>
            <button
              className="btn btn-outline-primary mr-2"
              onClick={() => {
                setPrtOptEditShow(true);
                console.log(prtOptEditShow);
                console.log(list);
                setSelectedPrt(list);
              }}
              // onClick={() => {
              //   setPrtOptEditShow(true);
              //   setPrt(list);
              // }}
            >
              <i className="fa fa-wrench"></i>
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                setPrtModEditShow(true);
                console.log(prtOptEditShow);
                console.log("oi");
                // setPrt(list);
              }}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-outline-danger ml-2"
              // onClick={() => delPrtAPI(list)}
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
              <th>Localização</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* {list && list.map(renderRows)} */}

            {props.prtGetSelected && props.prtGetSelected.map(renderRows)}
            {props.statusGetSelected && props.statusGetSelected.map(renderRows)}
          </tbody>
        </Table>
        {/* <MyVerticallyCenteredModal
                            show={prtModEditShow}
                            onHide={() => setPrtModEditShow(false)}
                            id={prt.id}
                            sn={prt.sn}
                            model={prt.model}
                            manufacturer={prt.manufacturer}
                            type={prt.type}
                            updList={updPrtListAPI}
                          />*/}
        <PrtModOptions
          show={prtOptEditShow}
          onHide={() => setPrtOptEditShow(false)}
          obj={props.prtGetSelected}
          id={selectedPrt.id}
          sn={selectedPrt.sn}
          model={selectedPrt.model}
          manufacturer={selectedPrt.manufacturer}
          type={selectedPrt.type}
          status={selectedPrt.status}
          //   updList={updselectedPrtListAPI}
          prtList={printerList}
        />
      </>
    );
  };

  return (
    <>
      <hr />
      <Form.Row>
        <Card.Title className="ml-1 mt-2 mb-4 text-muted">
          Gerenciar Equipamento
        </Card.Title>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="snNewPrinter">
          <Form.Label>Buscar por S/N</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={(e) => {
              setSelectedSN(e);
              setStatusDisabled(true);
            }}
            onInputChange={setStatusDisabled}
            options={prtListOnProdOptions}
            placeholder="Digite o S/N do equipamento..."
            selected={selectedSN}
            disabled={snDisabled}
            emptyLabel="Nenhum resultado encontrado."
            // inputProps={{ required: true }}
          />
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="snNewPrinter">
          <Form.Label>Buscar por Status</Form.Label>
          <Typeahead
            ref={formRef}
            id="basic-typeahead-single"
            labelKey="name"
            onChange={(e) => {
              setSelectedStatus(e);
              setSnDisabled(true);
            }}
            onInputChange={setSnDisabled}
            options={arr}
            placeholder="Selecione o Status do equipamento..."
            selected={selectedStatus}
            disabled={statusDisabled}
            emptyLabel="Nenhum resultado encontrado."

            // inputProps={{ required: true }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="snNewPrinter">
          <Button
            variant="outline-secondary"
            size="sm"
            block
            onClick={(e) => {
              setSelectedSN([]);
              setSelectedStatus([]);
              setStatusDisabled(false);
              setSnDisabled(false);
            }}
            disabled={
              selectedSN.length === 1 || selectedStatus.length === 1
                ? false
                : true
            }
          >
            Limpar
          </Button>
        </Form.Group>
      </Form.Row>
      {selectedSN.length === 1 ? (
        <TableEquipmentOptions prtGetSelected={prtGetSelected} {...props} />
      ) : null}
      {selectedStatus.length === 1 ? (
        <TableEquipmentOptions statusGetSelected={statusGetSelected} />
      ) : null}
    </>
  );
};

export default PrtManager;
