import { squares } from '../../../utils/logic/icons'

import styles from './TitleBar.module.css';

const TitleBar = () => {
    return (
    <section className={styles.titleBar}>
        <span className={styles.titleBar__left}>
          {String.fromCharCode(...squares.ant)}
          <h1>Antsweeper</h1>
        </span>
        <span className={styles.titleBar__right} disabled>
          <button className={styles.wc_minimize}></button>
          <button className={styles.wc_maximize}></button>
          <button className={styles.wc_close}></button>
        </span>
      </section>
    )
}

export default TitleBar;