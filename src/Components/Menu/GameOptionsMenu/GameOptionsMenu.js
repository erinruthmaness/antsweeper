import { useContext } from "react";
import paramContext from "../../../utils/store/paramsContext";
import levels from "../../../utils/store/initialState/paramLevels";
import styles from "../NavDropdown/NavDropdown.module.css";
// import styles from "./GameOptionsMenu.module.css";

const GameOptionsMenu = (props) => {
  const paramCtx = useContext(paramContext);

  const handleSelect = {
    beginner: () => {
      props.dismiss();
      paramCtx.setParameters(levels.beginner);
    },
    intermediate: () => {
      props.dismiss();
      paramCtx.setParameters(levels.intermediate);
    },
    expert: () => {
      props.dismiss();
      paramCtx.setParameters(levels.expert);
    },
  };

  let selected = {
    beginner: null,
    intermediate: null,
    expert: null,
  };

  switch (paramCtx.level) {
    case "beginner":
      selected.beginner = styles.selected;
      break;
    case "intermediate":
      selected.intermediate = styles.selected;
      break;
    case "expert":
      selected.expert = styles.selected;
      break;
    default:
      console.log("switch case error: ", paramCtx.level);
  }

  return (
    <li className={styles.dropdown_menu_contents}>
      <ul className={styles.dropdown_menu_section}>
        <li>New Game</li>
      </ul>
      <ul className={styles.dropdown_menu_section}>
        <li onClick={handleSelect.beginner} className={selected.beginner}>
          Beginner
        </li>
        <li
          onClick={handleSelect.intermediate}
          className={selected.intermediate}
        >
          Intermediate
        </li>
        <li onClick={handleSelect.expert} className={selected.expert}>
          Expert
        </li>
      </ul>
    </li>
  );
};

export default GameOptionsMenu;
