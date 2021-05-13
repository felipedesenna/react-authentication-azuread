import React from "react";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import { IconContext } from "react-icons";
import { RiErrorWarningFill } from "react-icons/ri";
import * as Ri from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";

const customToast = (msg, i) => {
  
  const SelectedIcon = i
  


  return (
    <IconContext.Provider
      value={{ color: "white", className: "global-class-name", size: "2em" }}
    >
      <div className="d-flex align-items-center">
        <div className="mr-2 ml-0"><SelectedIcon /></div>
        <div className="ml-1"> {msg} </div>
      </div>

    </IconContext.Provider>
  );
};

const axiosSuccess = (msg, i) => {
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
    closeButton: false
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
    closeButton: false
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
    closeButton: false
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
    closeButton: false
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
    closeButton: false
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
    closeButton: false
  });
};

const notifyApp = ({ type, msg, i }) => {
  switch (type) {
    case "success":
      return success(msg, i);
      break;
    case "info":
      return info(msg, i);
      break;
    case "warn":
      return warn(msg, i);
      break;
    case "error":
      return error(msg, i);
      break;
    case "axiosError":
      return axiosError(msg, i);
      break;
    case "axiosSuccess":
      return axiosSuccess(msg, i);
      break;

    default:
      return null;
      break;
  }
};

export default notifyApp;
