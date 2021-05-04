import Nav from "../Nav/Nav";
import Board from "../../Game/Board/Board";

import styles from "./Window.module.css";

const Window = () => {
  return (
    <main className={`windows95 ${styles.main_window}`}>
      <Nav />
      <Board />
    </main>
  );
};

export default Window;
