import React from "react";
import ReactDOM from "react-dom";
import { Providers } from "utils/store";
import App from "./Components/Background/App/App";

import "./style/index.css";
import "./style/windows98.css";
import "./style/levels.css";

ReactDOM.render(
  <React.StrictMode>
    <Providers.Window>
      <Providers.Params>
        <Providers.Round>
          <Providers.Board>
            <Providers.User>
              <App />
            </Providers.User>
          </Providers.Board>
        </Providers.Round>
      </Providers.Params>
    </Providers.Window>
  </React.StrictMode>,
  document.getElementById("root")
);
