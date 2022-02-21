import PropTypes from "prop-types";
import { assessDigit } from "utils/logic/helpers";
import styles from "./CalcScreen.module.css";

const CalcScreen = (props) => {
    let displayNum = props.display.toString().padStart(3, "0").split("");

    if (!displayNum || displayNum === "off") {
        displayNum = ["8", "8", "8"];
    }

    return (
        <header className={styles.calcScreen} id={props.id}>
            {displayNum.map((digit, digitIdx) => (
                <div key={`${props.id}-digit-${digitIdx}`} className={`${styles.digit} ${styles[assessDigit("digit", digit)]}`}>
                    <div className={`${styles.digit__top} ${styles.digit__half}`}></div>
                    <div className={`${styles.digit__bottom} ${styles.digit__half}`}></div>
                </div>
            ))}
        </header>
    );
};

CalcScreen.propTypes = {
    display: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
};

export default CalcScreen;
