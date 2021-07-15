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
        if (clock < 999) {
          setClock((prevTime) => prevTime + 1);
        }
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
    <section className={styles.controls}>
        <CalcScreen
          id={"flags"}
          display={props.inProgress || clockStarted ? props.flags : "off"}
        />
      <FaceButton onClick={startGameHandler} face={props.face} />
        <CalcScreen
          id={"timer"}
          display={props.inProgress || clockStarted ? clock : "off"}
        />
    </section>
  );
};

export default Controls;
