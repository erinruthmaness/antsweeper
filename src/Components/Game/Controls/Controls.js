import { useState, useEffect } from "react";
import FaceButton from "../FaceButton/FaceButton";
import CalcScreen from "../CalcScreen/CalcScreen";
import styles from "./Controls.module.css";

const Controls = (props) => {
  const [clock, setClock] = useState("off");
  const [clockStarted, setClockStarted] = useState(false);

  const startGameHandler = () => {
    setClock(0);
    setClockStarted(true);
    props.startGame();
  };

  useEffect(() => {
    let timer;

    if (clockStarted) {
      timer = setInterval(() => {
        setClock((prevTime) => prevTime + 1);
        console.log(clock);
      }, 1000);
    }
    if (!props.inProgress && clock > 0) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [clock, clockStarted, props.inProgress]);

  return (
    <nav className={styles.board_controls}>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen
          id={"flags"}
          display={clockStarted ? props.flags : "off"}
        />
      </div>
      <div className={styles.face_button__wrapper}>
        <FaceButton onClick={startGameHandler} face={props.face} />
      </div>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen id={"timer"} display={clockStarted ? clock : "off"} />
      </div>
    </nav>
  );
};

export default Controls;
