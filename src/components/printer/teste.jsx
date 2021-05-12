import React from "react";
import PropTypes from "prop-types";

const HelloWorld = ({ name }) => {
  const sayHello = (event) => {
    alert(`Hello ${name}`);
  };
  return (
    <a href="#" onClick={sayHello}>
      Say Hello
    </a>
  );
};
HelloWorld.propTypes = { name: PropTypes.string.isRequired };

export default HelloWorld;
