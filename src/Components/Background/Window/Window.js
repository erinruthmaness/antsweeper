import { useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";

import Nav from "../Nav/Nav";
import Board from "../../Game/Board/Board";
import styles from "./Window.module.css";

const Window = () => {
  const paramCtx = useContext(paramContext);

  // const levelStyle = styles[]

  return (
    <main className={`windows95 ${styles.main_window} ${styles[paramCtx.level]}`}>
      <Nav />
      <Board />
    </main>
  );
};

export default Window;
