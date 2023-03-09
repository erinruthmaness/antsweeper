import Window from "Components/Window/Window";
import Footer from "Components/Background/Footer/Footer";

import { useContext } from "react";
import paramsContext from "utils/store/paramsContext";
import userContext from "utils/store/userContext";
import "style/levels.css";

import styles from "./App.module.css";

function App() {
    const paramCtx = useContext(paramsContext);
    const userCtx = useContext(userContext);
    const handleClick = (e) => userCtx.click.set(e);
    const handleKeyPress = (e) => userCtx.key.set(e);

    return (
        <div
            className={`${paramCtx.level} ${styles.window_container}`}
            onClick={handleClick}
            onKeyDown={handleKeyPress}>
            <Window />
            <Footer />
        </div>
    );
}

export default App;
