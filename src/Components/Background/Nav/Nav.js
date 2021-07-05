import NavButton from "../../Menu/NavButton/NavButton";

import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <header className={styles.page_nav}>
      <section className={styles.menu_bar}>
        <span className={styles.menu_bar__left}>
          {String.fromCharCode("0xD83D", "0xDC1C")}
          <span className={styles.game_title}>Antsweeper</span>
        </span>
        <span className={`${styles.menu_bar__right} ${styles.wc_box}`} disabled>
          <button className={styles.wc_minimize}></button>
          <button className={styles.wc_maximize}></button>
          <button className={styles.wc_close}></button>
        </span>
      </section>
      <nav>
        <ul className={styles.dropdown_menu}>
          <NavButton buttonText={"Game"} />
          <NavButton buttonText={"Help"} />
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
