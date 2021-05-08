import { squares, faces } from "./icons";

// returns { which: "left"/"right", face : "[face code]"}
export const squareHandler = {
  squareResponse: (whichClick, whichFace) => {
    return { which: whichClick, face: whichFace };
  },
  touchStart: (flagged) => {
    if (flagged) {
      return squareHandler.squareResponse("touchStart", faces.winking);
    } else {
      return squareHandler.squareResponse("touchStart", faces.yelling);
    }
  },
  touchEnd: (count) => {
    console.log("touch end count is " + count);
    //since touchStart doesn't put the face back on :D like mouseDown does
    //touchEnd has to do it!
    if (count > 0) {
      return squareHandler.squareResponse("right", faces.smiling);
    } else {
      return squareHandler.squareResponse("left", faces.smiling);
    }
  },
  mouseDown: (whichNum, squareProps) => {
    console.log("clicking " + squareProps.id);
    console.log(squareProps.sq);
    if (whichNum === 1) {
      //left click
      if (squareProps.flagged) {
        return squareHandler.squareResponse("left", faces.winking);
      } else {
        //yell until mouse release
        return squareHandler.squareResponse("left", faces.yelling);
      }
    } else {
      if (squareProps.flagged) {
        //removing flag
        return squareHandler.squareResponse("right", faces.sweating);
      } else {
        //flag placement
        return squareHandler.squareResponse("right", faces.smiling);
      }
    }
  },
};

//returns { square: {updated square}, face: [face code], continue: bool }
export const boardHandler = {
  routeClick: (clickedSquare, whichClick) => {
    console.log("handling a " + whichClick + " click for:");
    console.log(clickedSquare);
    if (whichClick === "left") {
      return boardHandler.leftClick(clickedSquare);
    } else if (whichClick === "right") {
      return boardHandler.rightClick(clickedSquare);
    }
  },
  leftClick: (sq) => {
    if (sq.flagged || sq.revealed) {
      return { square: sq, face: faces.smiling, continue: true };
    } else {
      if (sq.ant) {
        return {
          square: {
            ...sq,
            display: squares.ant,
            revealed: true,
          },
          face: faces.exploded,
          continue: false,
        };
      } else {
        return {
          square: {
            ...sq,
            display: sq.neighbors,
            revealed: true,
          },
          face: faces.smiling,
          continue: true,
        };
      }
    }
  },
  rightClick: (sq) => {
    if (sq.flagged) {
      return {
        square: {
          ...sq,
          display: squares.unclicked,
          revealed: false,
          flagged: false,
        },
        face: faces.smiling,
        continue: true,
      };
    } else {
      return {
        square: {
          ...sq,
          display: squares.flag,
          revealed: false,
          flagged: true,
        },
        face: faces.smiling,
        continue: true,
      };
    }
  },
};
