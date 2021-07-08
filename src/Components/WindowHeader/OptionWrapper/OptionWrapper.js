import OptionDropdown from "../OptionDropdown/OptionDropdown";
import styles from "./OptionWrapper.module.css";

const OptionWrapper = (props) => {

  return (
    <div className={styles.optionButton__wrapper}>
      <button className={styles.optionButton} onClick={props.handleClick}>
        {props.buttonText}
        </button>
      {props.dropdown ? (
        <OptionDropdown which={props.buttonText} />
        ) : null}
    </div>
  );
};

export default OptionWrapper;
