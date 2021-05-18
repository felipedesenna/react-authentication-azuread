import React, { hashHistory, useState, useRef, useEffect } from "react";
import * as APIConn from "../api/ApiConnector";
import * as Ri from "react-icons/ri";
import { toast } from "react-toastify";
import Toast, {
  axiosToast,
  axiosToastUpdate,
} from "../Notifications/NotificationProvider";

export const PrtListAPI = () => {
  const [list, setList] = useState([]);
  const toastId = useRef(null);

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
