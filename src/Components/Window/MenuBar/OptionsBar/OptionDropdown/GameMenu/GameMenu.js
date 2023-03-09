import { Fragment, useContext } from "react";
import { paramsContext, roundContext, windowContext } from "utils/store";
import { LEVELS } from "utils/strings";
import { capitalizeFirstLetter } from "utils/logic/helpers";
import HighScores from "Components/Modal/HighScores";
import styles from "../../OptionDropdown/OptionDropdown.module.css";

// import styles from "./GameMenu.module.css";

const GameMenu = () => {
  const paramCtx = useContext(paramsContext);
  const roundCtx = useContext(roundContext);
  const windowCtx = useContext(windowContext);

  const handleSelect = (newLevel) => {
    paramCtx.setParameters(newLevel);
  };

  const handleReset = () => {
    roundCtx.set.reset();
  };

  const handleModal = () => {
    windowCtx.overlay.modal("Best Times", <HighScores />);
  };

  return (
    <Fragment>
      <ul className={styles.dropdown__section}>
        <li onClick={handleReset} aria-label="New Game">
          New Game
        </li>
      </ul>
      <ul className={styles.dropdown__section}>
        {Object.values(LEVELS).map((lvl) => {
          return (
            <li
              key={`level-${lvl}`}
              onClick={() => handleSelect(lvl)}
              className={paramCtx.level === lvl ? styles["--selected"] : null}
              aria-label={capitalizeFirstLetter(lvl)}>
              {capitalizeFirstLetter(lvl)}
            </li>
          );
        })}
      </ul>
      <ul className={styles.dropdown__section}>
        <li
          className={` ${styles["--secondaryLetter"]}`}
          onClick={handleModal}
          aria-label="Best Times">
          Best <span>T</span>imes...
        </li>
      </ul>
    </Fragment>
  );
};

export default GameMenu;
