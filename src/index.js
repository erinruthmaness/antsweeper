import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import "./style/windows98.css";
import "./style/levels.css";
import { WindowCtxProvider } from "./utils/store/windowContext";
import App from "./Components/Background/App/App";

ReactDOM.render(
	<React.StrictMode>
		<WindowCtxProvider>
			<App />
		</WindowCtxProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
