import PropTypes from "prop-types";
import { assessDigit } from "utils/logic/helpers";
import styles from "./CalcScreen.module.css";

const CalcScreen = ({id, display, ...a11yProps}) => {
    let displayNum = display.toString().padStart(3, "0").split("");

    if (!displayNum || displayNum === "off") {
        displayNum = ["8", "8", "8"];
    }

    return (
        <div
            className={styles.calcScreen}
            id={id}
            {...a11yProps}
            value={display}>
            {displayNum.map((digit, digitIdx) => (
                <div
                    key={`${id}-digit-${digitIdx}`}
                    className={`${styles.digit} ${styles[assessDigit("digit", digit)]}`}>
                    <div className={`${styles.digit__top} ${styles.digit__half}`}></div>
                    <div className={`${styles.digit__bottom} ${styles.digit__half}`}></div>
                </div>
            ))}
        </div>
    );
};

CalcScreen.propTypes = {
    display: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    role: PropTypes.string.isRequired,
    ["aria-live"]: PropTypes.string, // eslint-disable-line
    ["aria-valuemax"]: PropTypes.number, // eslint-disable-line
    ["aria-valuemin"]: PropTypes.number, // eslint-disable-line
    ["aria-valuenow"]: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) // eslint-disable-line
};

export default CalcScreen;
