import React, { hashHistory, useState, useRef, useEffect } from "react";
import {
    Button,
    Form,
    Col,
    Modal,
    Card,
    Fragment,

} from "react-bootstrap";
import {
    Typeahead,
    Highlighter,
    Menu,
    MenuItem,
} from 'react-bootstrap-typeahead';
import * as APIConn from "../../api/ApiConnector";
import Toast, {
    axiosToast,
    axiosToastUpdate,
} from "../../Notifications/NotificationProvider";
import * as Ri from "react-icons/ri";
import { toast } from "react-toastify";
import { range } from 'lodash';
import "react-datepicker/dist/react-datepicker.css";

// const options = range(0, 1000).map(o => `Option ${o.toString()}`);



const PrtReplace = (props) => {
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);
    const toastId = useRef(null);
    const [sn, setSN] = useState();
    const [model, setModel] = useState();
    const [manufacturer, setManufacturer] = useState();
    const [type, setType] = useState();
    console.log(props)
    const [singleSelections, setSingleSelections] = useState([]);
    const [multiSelections, setMultiSelections] = useState([]);
    const prtList = props.prtList
    const lista = prtList.map(sn => sn.sn)
    const options = lista.filter((lista) => lista !== props.sn)
    console.log(options)

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
                    type: toast.TYPE.SUCCESS
                });
                handleReset();
                break;
            case 111:
                axiosToastUpdate({
                    tstId: toastId,
                    msg: `Equipamento '${res.printer.sn}' já consta cadastrado na base`,
                    i: Ri.RiAlertFill,
                    type: toast.TYPE.ERROR
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
                    <Card.Title className="ml-1 mt-2 mb-4 text-muted">Substituição por Avaria</Card.Title>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="tktGLPI">
                        <Form.Label>Ticket GLPI</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => {
                                setSN(e.target.value);
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
                                setModel(e.target.value);
                            }}
                            placeholder="Digite o Modelo..."
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="sector">
                        <Form.Label>Setor</Form.Label>
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
                <Form.Row>
                    <Form.Group
                        as={Col} md="12"
                        controlId="problemFound">
                        <Form.Label>Problema apresentado</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            required
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                            placeholder="Descreva o defeito apresentado..." />
                    </Form.Group>
                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="snNewPrinter">
                        <Form.Label>S/N do novo equipamento</Form.Label>
                        <Typeahead
                            id="basic-typeahead-single"
                            labelKey="name"
                            onChange={setSingleSelections}
                            options={options}
                            placeholder="Selecione o S/N do equipamento instalado..."
                            selected={singleSelections}
                            inputProps={{ required: true }}
                        />
                    </Form.Group>
                </Form.Row>

                <hr />
                <div className="d-flex flex-row-reverse">
                    <Button variant="primary"
                        type="submit" className="ml-2">Salvar</Button>
                    <Button variant="secondary"
                        onClick={props.onHide} className="ml-2">Cancelar</Button>
                </div>
            </Form>
        </>
    );
};

export default PrtReplace