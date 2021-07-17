import { useState, useContext, useEffect } from "react";
import windowContext from "../../../utils/store/windowContext";
import OptionButtonWrapper from "../OptionWrapper/OptionWrapper";

import styles from "./OptionsBar.module.css";

const OptionsBar = () => {
  const windowCtx = useContext(windowContext);
  const [dropdown, setDropDown] = useState({
    game: false,
    help: false,
  });

  const showGameMenu = () => {
    setDropDown({ game: true, help: false });
  };

  const showHelpMenu = () => {
    setDropDown({ game: false, help: true });
  };

  const hideBoth = () => {
    setDropDown({ game: false, help: false });
  };

  const handleHelpClick = () => {
    //if one of the dropdowns is open
    if (windowCtx.overlay.display) {
      if (dropdown.help) {
        //if the help menu is already open
        hideBoth();
        windowCtx.overlay.hide();
      } else {
        showHelpMenu();
      }
    } else {
      //open Help dropdown
      showHelpMenu();
      windowCtx.overlay.show();
    }
  };

  const handleGameClick = () => {
    //if one of the dropdowns is open
    if (windowCtx.overlay.display) {
      if (dropdown.game) {
        //if the game menu is already open
        hideBoth();
        windowCtx.overlay.hide();
      } else {
        showGameMenu();
      }
    } else {
      //open Game dropdown
      showGameMenu();
      windowCtx.overlay.show();
    }
  };

  useEffect(() => {
    //hide both menus whenever overlay hides
    if (!windowCtx.overlay.display) {
      hideBoth();
    }
  }, [windowCtx.overlay.display, setDropDown]);

  return (
    <nav className={styles.optionsBar}>
      <OptionButtonWrapper
        buttonText={"Game"}
        handleClick={handleGameClick}
        dropdown={dropdown.game}
      />
      <OptionButtonWrapper
        buttonText={"Help"}
        handleClick={handleHelpClick}
        dropdown={dropdown.help}
      />
    </nav>
  );
};

export default OptionsBar;
