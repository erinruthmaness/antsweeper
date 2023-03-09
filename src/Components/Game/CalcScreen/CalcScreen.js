import { assessDigit } from '../../../utils/logic/helpers'
import styles from "./CalcScreen.module.css";


const CalcScreen = (props) => {
  let displayNum = props.display.toString().padStart(3, "0").split("");

  if (!displayNum || (displayNum === "off")) {
    displayNum = ["8", "8", "8"];
  }
  
  return (
    <section className={styles.calcScreen} id={props.id}>
      {displayNum.map((digit, digitIdx) => (
        <div
          key={`${props.id}-digit-${digitIdx}`}
          className={`${styles.digit} ${styles[assessDigit("digit", digit)]}`}
        >
          <div className={`${styles.digit__top} ${styles.digit__half}`}></div>
          <div className={`${styles.digit__bottom} ${styles.digit__half}`}></div>
        </div>
      ))}
    </section>
  );
};

export default CalcScreen;
