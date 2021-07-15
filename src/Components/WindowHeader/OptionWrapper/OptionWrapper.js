import OptionDropdown from "../OptionDropdown/OptionDropdown";
import styles from "./OptionWrapper.module.css";

const OptionWrapper = (props) => {

  let buttonStyle = `${styles.optionButton}`;
  if (props.dropdown) {
    buttonStyle+=` ${styles["optionButton--clicked"]}`
  }

  return (
    <div className={styles.optionButton__wrapper}>
      <button className={buttonStyle} onClick={props.handleClick}>
        {props.buttonText}
        </button>
      {props.dropdown ? (
        <OptionDropdown which={props.buttonText} />
        ) : null}
    </div>
  );
};

export default OptionWrapper;
