import { useRef } from "react";
import styles from "./Square.module.css";

let count = 0;

function Square(props) {
  let whichClick = "left";
  const countRef = useRef();

  const handleMouseDown = (event) => {
    console.log("clicked " + props.id);
    //start counting how long they hold down the mouse
    //(for mobile users who can't right-click)
    countRef.current = setInterval(() => {
      count = count + 1;
      if (count > 0) {
        props.changeFace(["0xD83D", "0xDE0A"]); //smiling
      }
    }, 400);
    if (event.nativeEvent.which === 1) {
      //left click
      if (!props.flagged) {
        props.changeFace(["0xD83D", "0xDE31"]); //yelling
      }
    } else {
      whichClick = "right";
    }
  };

  const handleMouseUp = (event) => {
    clearInterval(countRef.current);
    if (event.nativeEvent.which !== 1 || count > 0) {
      whichClick = "right";
    }
    props.onClick(props.column, props.row, whichClick);
  };

  return (
    <button
      className={`${styles.grid_square} windows95 ${
        props.clicked && styles.clicked_square
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {props.flagged
        ? String.fromCharCode(props.show[0], props.show[1])
        : props.show}
    </button>
  );
}

export default Square;
