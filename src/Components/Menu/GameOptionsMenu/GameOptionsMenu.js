import { useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";
import roundContext from "../../../utils/store/roundContext";
import levels from "../../../utils/store/initialState/paramLevels";
import styles from "../NavDropdown/NavDropdown.module.css";
// import styles from "./GameOptionsMenu.module.css";

const GameOptionsMenu = (props) => {
  const gameLevels = ["beginner", "intermediate", "expert"];
  const paramCtx = useContext(paramContext);
  const roundCtx = useContext(roundContext);

  const handleSelect = (lvl) => {
    props.dismiss();
    paramCtx.setParameters(levels[lvl]);
  };

  const handleReset = () => {
    props.dismiss();
    roundCtx.set.reset();
  };

  return (
    <li className={styles.dropdown_menu_contents}>
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
    </li>
  );
};

export default GameOptionsMenu;
