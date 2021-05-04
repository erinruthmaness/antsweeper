import { useState } from 'react';
import styles from './Square.module.css';

function Square(props) {

    const [clicked, setClicked] = useState(props.clicked);

    const handleClick = () => {
        console.log("clicked " + props.id);
        setClicked(true);
        props.onClick(props.column, props.row);
    }

  if (clicked) {
    return <button className={styles.grid_square}>:o</button>;
  } else {
    return <button className={styles.grid_square} onClick={handleClick}>?</button>;
  }
}

export default Square;
