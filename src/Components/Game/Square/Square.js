// import { useState } from 'react';
import styles from "./Square.module.css";

function Square(props) {
  const handleMouseDown = (event) => {
    console.log("clicked " + props.id);
    if (event.nativeEvent.which === 1) {
      //left click
      if (!props.flagged) {
        props.changeFace(["0xD83D", "0xDE31"]); //yelling
      }
    }
  };

  const handleMouseUp = (event) => {
    let whichClick = "left";
    if (event.nativeEvent.which !== 1) {
      whichClick = "right";
    }
    props.onClick(props.column, props.row, whichClick);
  };

  return (
    <button
      className={`${styles.grid_square} windows95 ${props.clicked && styles.clicked_square}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {props.flagged ? String.fromCharCode(props.show[0], props.show[1]) : props.show}
    </button>
  );
}

export default Square;
