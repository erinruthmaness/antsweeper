import { Fragment, useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";
import roundContext from "../../../utils/store/roundContext";
import overlayContext from "../../../utils/store/overlayContext";
import levels from "../../../utils/store/initialState/paramLevels";
import styles from "../OptionDropdown/OptionDropdown.module.css";
// import styles from "./GameMenu.module.css";

const GameMenu = (props) => {
  const gameLevels = ["beginner", "intermediate", "expert"];
  const paramCtx = useContext(paramContext);
  const roundCtx = useContext(roundContext);
  const overlayCtx = useContext(overlayContext);

  const handleSelect = (lvl) => {
    overlayCtx.hide();
    paramCtx.setParameters(levels[lvl]);
  };

  const handleReset = () => {
    overlayCtx.hide();
    roundCtx.set.reset();
  };

  return (
    <Fragment>
      <ul className={styles.dropdown_menu_section}>
        <li onClick={handleReset}>New Game</li>
      </ul>
      <ul className={styles.dropdown_menu_section}>
        {gameLevels.map((lvl) => {
          return (
            <li
              key={`level-${lvl}`}
              onClick={() => handleSelect(lvl)}
              className={paramCtx.level === lvl ? styles.selected : null}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default GameMenu;
