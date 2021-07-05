import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ParamCtxProvider } from "./utils/store/paramsContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ParamCtxProvider>
        <App />
    </ParamCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
