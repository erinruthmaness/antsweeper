import FaceButton from "../FaceButton/FaceButton";
import CalcScreen from "../CalcScreen/CalcScreen";
import styles from "./Controls.module.css";
const Controls = (props) => {
  return (
    <nav className={styles.board_controls}>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen id={"flags"} display={props.inProgress ? props.flags : "off"} />
      </div>
      <div className={styles.face_button__wrapper}>
        <FaceButton onClick={props.startGame} face={props.face} />
      </div>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen id={"timer"} display={"off"} />
      </div>
    </nav>
  );
};

export default Controls;
