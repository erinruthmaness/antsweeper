import Window from "../Window/Window";
import Footer from "../Footer/Footer";

import { useContext, useEffect } from "react";
import paramContext from "../../../utils/store/paramsContext";
import "../../../style/levels.css";

import styles from "./App.module.css";
import userContext from "../../../utils/store/userContext";

function App() {
	const paramCtx = useContext(paramContext);
	const userCtx = useContext(userContext);
	useEffect(() => {
		document.addEventListener("click", userCtx.click.set);
		document.addEventListener("keypress", userCtx.key.set);
	}, [userCtx]);

	return (
		<div className={`${paramCtx.level} ${styles.window_container}`}>
			<Window />
			<Footer />
		</div>
	);
}

export default App;
