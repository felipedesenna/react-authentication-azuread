import React from "react";
import { ToastContainer, toast, Slide, Bounce, Flip } from "react-toastify";
import { IconContext } from "react-icons";
import { RiErrorWarningFill } from "react-icons/ri";
import * as Ri from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";

const customToast = (msg, i) => {
  const SelectedIcon = i;

  return (
    <IconContext.Provider
      value={{ color: "white", className: "global-class-name", size: "2em"}}
    >
      <div className="d-flex align-items-center">
        <div className="mr-2 ml-0">
          <SelectedIcon />
        </div>
        <div className="ml-1"> {msg} </div>
      </div>
    </IconContext.Provider>
  );
};

const spinToast = (msg, i) => {
  const SelectedIcon = i;

  return (
    <IconContext.Provider
      value={{ color: "white", className: "global-class-name", size: "2em"}}
    >
      <div className="d-flex align-items-center">
        <div className="mr-2 ml-0 fas fa-spin">
          <SelectedIcon />
        </div>
        <div className="ml-1"> {msg} </div>
      </div>
    </IconContext.Provider>
  );
};

export const axiosToast = ({ tstId, msg, i }) => {
  tstId.current = toast.info(spinToast(msg, i), {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

export const axiosToastUpdate = ({ tstId, msg, i }) => {
  toast.update(tstId.current, {
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
    transition: Flip,
    render: customToast(msg, i),
  });
};

const axiosSuccess = (msg, i, tstId) => {
  toast.update(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
    ...tstId,
  });
};

const axiosError = (msg, i) => {
  toast.error(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

const axiosWait = (msg, i, tstId) => {
  toast.info(customToast(msg, i), {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
    ...tstId,
  });
};

const success = (msg, i) => {
  toast.success(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

const info = (msg, i) => {
  toast.info(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

const warn = (msg, i) => {
  toast.warn(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

const error = (msg, i) => {
  toast.error(customToast(msg, i), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    pauseOnFocusLoss: false,
    draggable: false,
    closeButton: false,
  });
};

const notifyApp = ({ type, tstId, msg, i }) => {
  switch (type) {
    case "success":
      success(msg, i);
      break;
    case "info":
      info(msg, i);
      break;
    case "warn":
      warn(msg, i);
      break;
    case "error":
      error(msg, i);
      break;
    case "axiosError":
      axiosError(msg, i);
      break;
    case "axiosSuccess":
      axiosSuccess(msg, i, tstId);
      break;
    case "axiosWait":
      axiosWait(msg, i, tstId);
      break;
    default:
      return null;
  }
};

export default notifyApp;
