import { useRef } from "react";
import { squareHandler } from "../utils/click";
import styles from "./Square.module.css";

//declared outside of the component in case it might rerender & reset to default
//don't need it in state because state triggers a UI change (rerender)
let mouseClick = "left";
let touchLength = 0;

function Square(props) {
  const countRef = useRef();

  const parseClick = (event, eventString) => {
    if (props.gameOver) {
      return;
    }
    switch (eventString) {
      case "down":
        //changes facebutton and determines if left or right click
        console.log("mouse down on " + props.id);
        if (
          !props.sq.revealed &&
          (!props.sq.flagged ||
            (props.sq.flagged && event.nativeEvent.which !== 1))
        ) {
          let downResult = squareHandler.mouseDown(
            event.nativeEvent.which,
            props
          );
          mouseClick = downResult.which;
          props.changeFace(downResult.face);
        }
        break;
      case "up":
        //sends left/right and square back to Board, which updates Square props
        console.log("mouse up on " + props.id);
        updateSquare(mouseClick);
        break;
      case "start":
        //starts timer and manages face button
        console.log("touch started on " + props.id);
        let startResult1 = squareHandler.touchStart(props, touchLength);
        props.changeFace(startResult1.face);
        countRef.current = setInterval(() => {
          let startResult2 = squareHandler.touchStart(props, touchLength);
          props.changeFace(startResult2.face);
          touchLength++;
          console.log(touchLength);
          //manages the face button
        }, 800);
        break;
      case "end":
        //stops timer and sends left/right and square back to board
        console.log("touch ended on " + props.id);
        clearInterval(countRef.current);
        //determines long/short (right/left) click
        let endResult = squareHandler.touchEnd(touchLength);
        // props.changeFace(endResult.face);
        //left clicks shouldn't impact a flagged square
        if (props.sq.flagged && endResult.which === "left") {
          return;
        } else {
          updateSquare(endResult.which);
        }
        break;
      default:
        console.log("switch case error: ", eventString);
    }
  };

  const updateSquare = (leftOrRight) => {
    //reset defaults
    mouseClick = "left";
    touchLength = 0;
    props.onClick(props.sq.col, props.sq.row, leftOrRight);
  };

  return (
    <button
      className={`${styles.grid_square} windows95 ${
        props.sq.revealed && styles.clicked_square
      }`}
      onMouseDown={(e) => parseClick(e, "down")}
      onMouseUp={(e) => parseClick(e, "up")}
      onTouchStart={(e) => parseClick(e, "start")}
      onTouchEnd={(e) => parseClick(e, "end")}
      onContextMenu={(e) => e.preventDefault()}
    >
      {Array.isArray(props.sq.display)
        ? String.fromCharCode(props.sq.display[0], props.sq.display[1])
        : props.sq.display}
    </button>
  );
}

export default Square;
