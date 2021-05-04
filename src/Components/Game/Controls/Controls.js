import FaceButton from "../FaceButton/FaceButton";
import CalcScreen from '../CalcScreen/CalcScreen';
import styles from "./Controls.module.css";
const Controls = (props) => {
  return (
    <nav className={styles.board_controls}>
      <div className={styles.calc_screen__wrapper}>
      <CalcScreen id={"score"} />
      </div>
      <div className={styles.face_button__wrapper}>
      <FaceButton onClick={props.startGame} face={props.face} />
      </div>
      <div className={styles.calc_screen__wrapper}>
        <CalcScreen id={"timer"} />
      </div>
    </nav>
  );
};

export default Controls;
