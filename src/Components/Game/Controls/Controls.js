import { useState, useEffect } from "react";
import FaceButton from "../FaceButton/FaceButton";
import CalcScreen from "../CalcScreen/CalcScreen";
import styles from "./Controls.module.css";

const Controls = (props) => {
  const [clock, setClock] = useState("off");
  const [clockStarted, setClockStarted] = useState(props.firstClick);

  const startGameHandler = () => {
    setClock(0);
    // setClockStarted(true);
    props.startGame();
  };

  useEffect(() => {
    if (props.firstClick && !clockStarted) {
      setClockStarted(true);
    }
    if (!props.firstClick && clockStarted) {
      setClockStarted(false)
    }
    return () => {
    };
  }, [props.firstClick, clockStarted]);

  useEffect(() => {
    let timer;
    if (clockStarted && props.inProgress && props.firstClick) {
      timer = setInterval(() => {
        setClock((prevTime) => prevTime + 1);
        // console.log(clock);
      }, 1000);
    }
    if (!props.inProgress) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [clock, clockStarted, props.firstClick, props.inProgress]);

  return (
    <nav className={styles.board_controls}>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen
          id={"flags"}
          display={props.inProgress || clockStarted ? props.flags : "off"}
        />
      </div>
      <div className={styles.face_button__wrapper}>
        <FaceButton onClick={startGameHandler} face={props.face} />
      </div>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen
          id={"timer"}
          display={props.inProgress || clockStarted ? clock : "off"}
        />
      </div>
    </nav>
  );
};

export default Controls;
