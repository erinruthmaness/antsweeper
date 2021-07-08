import TitleBar from '../TitleBar/TitleBar';
import OptionsBar from '../OptionsBar/OptionsBar';

import styles from "./MenuBar.module.css";

const MenuBar = () => {
  return (
    <header className={styles.menuBar}>
     <TitleBar />
     <OptionsBar />
    </header>
  );
};

export default MenuBar;
