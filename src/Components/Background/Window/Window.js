import Overlay from '../Overlay/Overlay';
import MenuBar from "../../WindowHeader/MenuBar/MenuBar";
import Board from "../../Game/Board/Board";
import styles from "./Window.module.css";

const Window = () => {

  return (
    <main className={styles.window}>
      <Overlay />
      <MenuBar />
      <Board />
    </main>
  );
};

export default Window;
