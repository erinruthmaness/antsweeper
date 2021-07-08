import { useState, useContext, useEffect } from "react";
import overlayContext from "../../../utils/store/overlayContext";
import OptionButtonWrapper from '../OptionWrapper/OptionWrapper';

import styles from './OptionsBar.module.css';

const OptionsBar = () => {
  const overlayCtx = useContext(overlayContext);
  const [dropdown, setDropDown] = useState({
    game: false, help: false
  });

  const showGameMenu = () => {
    setDropDown({game: true, help: false});
  }

  const showHelpMenu = () => {
    setDropDown({game: false, help: true});
  }

  const hideBoth = () => {
    setDropDown({game: false, help: false});
  }

  const handleHelpClick = () => {
    //if one of the dropdowns is open
    if (overlayCtx.display) {
      if (dropdown.help) {
        //if the help menu is already open
        hideBoth();
        overlayCtx.hide();
      } else {
        showHelpMenu();
      }
    }
    else {
      //open Help dropdown
      showHelpMenu();
      overlayCtx.show();
    }
  }

  const handleGameClick = () => {
    //if one of the dropdowns is open
    if (overlayCtx.display) {
      if (dropdown.game) {
        //if the game menu is already open
        hideBoth();
        overlayCtx.hide();
      } else {
        showGameMenu();
      }
    }
    else {
      //open Game dropdown
      showGameMenu();
      overlayCtx.show();
    }
  }
  
  useEffect(() => {
    //hide both menus whenever overlay hides
    if (!overlayCtx.display) {
      hideBoth();
    }
  }, [overlayCtx.display, setDropDown])

    return (
        <nav className={styles.optionsBar}>
          <OptionButtonWrapper buttonText={"Game"} handleClick={handleGameClick} dropdown={dropdown.game}/>
          <OptionButtonWrapper buttonText={"Help"} handleClick={handleHelpClick} dropdown={dropdown.help}/>
        </nav>
    )
}

export default OptionsBar;