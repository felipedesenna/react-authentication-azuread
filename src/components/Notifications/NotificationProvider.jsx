import React from "react";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import { IconContext } from "react-icons";
import {RiErrorWarningFill} from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";

const icon = (i) => {
  const icons = {warn: RiErrorWarningFill}
  const SelectedIcon = icons.warn
  
  return (
    <IconContext.Provider
      value={{ color: "white", className: "global-class-name", size:"2em" }}
    >
      <SelectedIcon />
    </IconContext.Provider>
  );
};

const success = (msg) => {
  toast.success(msg, {
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
  });
};

const info = (msg) => {
  toast.info(msg, {
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
  });
};

const warn = (msg) => {
  toast.warn(msg, {
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
  });
};

const error = (msg) => {
  toast.error(icon("<Ri.RiErrorWarningFill />"), {
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
  });
};

const notifyApp = ({ type, msg }) => {
  console.log({ type, msg });
  switch (type) {
    case "success":
      return success(msg);
      break;
    case "info":
      return info(msg);
      break;
    case "warn":
      return warn(msg);
      break;
    case "error":
      return error(msg);
      break;

    default:
      return null;
      break;
  }
};

export default notifyApp;
