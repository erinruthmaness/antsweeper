import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import "./style/windows98.css";
import "./style/levels.css";
import { ParamCtxProvider } from "./utils/store/paramsContext";
import App from "./Components/Background/App/App";

ReactDOM.render(
  <React.StrictMode>
    <ParamCtxProvider>
      <App />
    </ParamCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
