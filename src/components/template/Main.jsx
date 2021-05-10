/* eslint-disable import/no-anonymous-default-export */
import "./Main.css";
import React from "react";

import Header from "./Header";

export default function (props) {
  if (!props.navbar) {
    return (
      <React.Fragment>
        <Header {...props} />
        <main className="content container-fluid">
          <div className="p-3 mt-3">{props.children}</div>
        </main>
      </React.Fragment>
    );
  } else {
    return (
      <main>
        <React.Fragment>
          <Header {...props} />
          <main className="content container-fluid">
            <div className="p-3 mt-3">{props.navbar}</div>
          </main>
        </React.Fragment>
        <React.Fragment>
          <main className="content container-fluid">
            <div className="p-3 mt-3">{props.children}</div>
          </main>
        </React.Fragment>
      </main>
    );
  }
}
