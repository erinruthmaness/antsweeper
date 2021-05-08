import { useRef/*, useEffect*/ } from "react";
import { squareHandler } from "../utils/read";
import styles from "./Square.module.css";

//declared outside of the component in case it might rerender & reset to default
//don't need it in state because state triggers a UI change (rerender)
let wasClicked = false;
let clickType = "left";
let wasTouched = false;
let touchLength = 0;

function Square(props) {
  const countRef = useRef();

  const reset = () => {
    wasClicked = false;
    clickType = "left";
    wasTouched = false;
    touchLength = 0;
  };

  const parseClick = (event, eventString) => {
    //restore defaults real quick for people playing multiple games
    if (props.gameOver) {
      reset();
      return;
    }
    if (
      wasTouched ||
      props.sq.revealed ||
      (props.sq.flagged && event.nativeEvent.which === 1)
    ) {
      //do nothing if user is mobile, if square is already revealed,
      //or if flagged and this is a left click
      return;
    } else if (eventString === "down") {
      wasClicked = true;
      console.log("mouse down on " + props.id);
      //returns which: left or right click
      //and face: what the face button should be (just :o since this is mousedown, not up)
      let downResult = squareHandler.mouseDown(event.nativeEvent.which, props);
      clickType = downResult.which;
      props.changeFace(downResult.face);
    } else if (eventString === "up") {
      console.log("mouse up on " + props.id);
      if (!wasTouched) {
        updateSquare(clickType);
      }
    }
  };

  const parseTouch = (eventString) => {
    if (props.gameOver) {
      reset();
      return;
    }
    //prevents a "double click" with touch firing and then mouse click firing
    if (props.gameOver || wasClicked || props.sq.revealed) {
      //do nothing if game is over, if user is mobile, or if square is already revealed
      return;
    } else if (eventString === "start") {
      wasTouched = true;
      console.log("touch started on " + props.id);
      props.changeFace(squareHandler.touchStart(props.sq.flagged).face);
      countRef.current = setInterval(() => {
        touchLength++;
        console.log(touchLength);
      }, 800);
    } else if (eventString === "end") {
      console.log("touch ended on " + props.id);
      //stops timer
      clearInterval(countRef.current);
      //returns which: left or right click
      let endResult = squareHandler.touchEnd(touchLength);
      //"left clicks" shouldn't impact a flagged square
      if (props.sq.flagged && endResult.which === "left") {
        props.changeFace(endResult.face); //flagged squares don't get processed by Board
        return;
      } else {
        updateSquare(endResult.which);
      }
    }
  };

  const updateSquare = (leftOrRight) => {
    //reset defaults for this square, but not wasClicked/wasTouched
    //because that should stay the same across the game
    clickType = "left";
    touchLength = 0;
    props.onClick(props.sq.col, props.sq.row, leftOrRight);
  };

  return (
    <button
      className={`${styles.grid_square} windows95 ${
        props.sq.revealed && styles.clicked_square
      }`}
      onMouseDown={(e) => parseClick(e, "down")}
      onMouseUp={!wasTouched ? (e) => parseClick(e, "up") : undefined}
      onTouchStart={() => parseTouch("start")}
      onTouchEnd={!wasClicked ? () => parseTouch("end") : undefined}
      onContextMenu={(e) => e.preventDefault()}
    >
      {Array.isArray(props.sq.display)
        ? String.fromCharCode(props.sq.display[0], props.sq.display[1])
        : props.sq.display}
    </button>
  );
}

export default Square;
