import { useRef } from "react";
import styles from "./Square.module.css";

let count = 0;
let whichClick = "left";

function Square(props) {
  const countRef = useRef();
  const clickHandlers = {
    handleTouchStart: () => {
      //start counting how long they hold down the mouse
      //(for mobile users who can't right-click)
      countRef.current = setInterval(() => {
        count = count + 1;
        console.log(count);
        if (count > 0) {
          props.changeFace(["0xD83D", "0xDE0A"]); //smiling
        }
      }, 800);
    },
    handleTouchEnd: () => {
      clearInterval(countRef.current);
      if (count > 0) {
        whichClick = "right";
        count = 0;
      }
      props.onClick(props.column, props.row, whichClick);
      whichClick = "left";
    },
    handleMouseDown: (event) => {
      console.log("clicked " + props.id);
      if (event.nativeEvent.which === 1) {
        //left click
        if (!props.flagged) {
          props.changeFace(["0xD83D", "0xDE31"]); //yelling
        }
      } else {
        whichClick = "right";
      }
    },
    handleMouseUp: (event) => {
      if (event.nativeEvent.which !== 1) {
        whichClick = "right";
      }
      props.onClick(props.column, props.row, whichClick);
      whichClick = "left";
      console.log(count);
    },
  };

  return (
    <button
      className={`${styles.grid_square} windows95 ${
        props.clicked && styles.clicked_square
      }`}
      onMouseDown={props.clicked ? undefined : clickHandlers.handleMouseDown}
      onMouseUp={props.clicked ? undefined : clickHandlers.handleMouseUp}
      onTouchStart={props.clicked ? undefined : clickHandlers.handleTouchStart}
      onTouchEnd={props.clicked ? undefined : clickHandlers.handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()}
    >
      {props.flagged
        ? String.fromCharCode(props.show[0], props.show[1])
        : props.show}
    </button>
  );
}

export default Square;
