import axios from "axios";
import Toast, { ContainerToast } from "../Notifications/NotificationProvider";
import * as Ri from "react-icons/ri";

export const savePrt = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/`;
  const printer = props.obj;
  const method = printer.id ? "put" : "post";
  const url = printer.id ? `${baseUrl}/${printer.id}` : baseUrl;
  return axios[method](url, printer);
};

export const getPrtList = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/`;
  // const printer = props.obj;
  const method = "get"
  const url = baseUrl;
  return axios[method](url);
};

export const deletePrt = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/${props.id}`;
  const method = "delete"
  const url = baseUrl;
  return axios[method](url);
};

export const alterPrt = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/${props.id}/alter`;
  const printer = props.obj;
  const method = "put"
  const url = baseUrl;
  return axios[method](url, printer);
};

export const replacePrt = (props) => {
  const baseUrl = `http://localhost:3333/${props.path}/${props.id}/replace`;
  const printer = props.obj;
  const method = "put"
  const url = baseUrl;
  return axios[method](url, printer);
};



// export const save = (props) => {
//   const baseUrl = `http://localhost:3333/${props.path}/`;
//   const printer = props.obj;
//   const method = printer.id ? "put" : "post";
//   const url = printer.id ? `${baseUrl}/${printer.id}` : baseUrl;
//   axios[method](url, printer)
//     .then((res) => {
//       console.log(`S/N ${res.data.printer.sn}`);
//       Toast({
//         type: "axiosSuccess",
//         msg: "Cadastro Efetuado",
//         i: Ri.RiCheckboxCircleFill,
//       });
//       return res.data;
//     })
//     .catch((e) => {
//       Toast({
//         type: "axiosError",
//         msg: "Equipamento já cadastrado",
//         i: Ri.RiCheckboxCircleFill,
//       });
//       return e;
//     });
// };
