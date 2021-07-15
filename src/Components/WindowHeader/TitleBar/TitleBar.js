import { squares } from '../../../utils/logic/icons'

import styles from './TitleBar.module.css';

const TitleBar = () => {
    return (
    <section className={styles.titleBar}>
        <span className={styles.titleBar__left}>
          {String.fromCharCode(...squares.ant)}
          <h1>Antsweeper</h1>
        </span>
        <span className={styles.titleBar__right}>
          <button>&#818;</button>
          <button>&#10006;</button>
        </span>
      </section>
    )
}

export default TitleBar;