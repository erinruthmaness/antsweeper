import styles from "./CalcScreen.module.css";

const assessDigit = (num) => {
  return ("digit_" + num.toString());
}

const CalcScreen = (props) => {
  let displayNum = props.display.toString().padStart(3, "0").split("");

  if (!displayNum || (displayNum === "off")) {
    displayNum = ["8", "8", "8"];
  }
  
  return (
    <section className={styles.calc_screen} id={props.id}>
      {displayNum.map((digit, digitIdx) => (
        <div
          key={`${props.id}-digit-${digitIdx}`}
          className={`${styles.calc_screen__digit} ${styles[assessDigit(digit)]}`}
        >
          <div className={`${styles.num_top} ${styles.digit_half}`}></div>
          <div className={`${styles.num_bottom} ${styles.digit_half}`}></div>
        </div>
      ))}
    </section>
  );
};

export default CalcScreen;
