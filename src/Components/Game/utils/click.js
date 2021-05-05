import { squares, faces } from "./icons";
// import { buildSquare } from './build';

// returns { which: "left"/"right", face : "[face code]"}
export const squareHandler = {
  squareResponse: (whichClick, whichFace) => {
    return { which: whichClick, face: whichFace };
  },
  touchStart: (squareProps, count) => {
    console.log("touching " + squareProps.id);
    if (count > 0) {
      //holding to place flag
      return squareHandler.squareResponse("touch", faces.sweating);
    } else {
      //intial tap
      return squareHandler.squareResponse("touch", faces.yelling);
    }
  },
  touchEnd: (count) => {
    console.log("touch end count is " + count);
    //these faces already got updated by touchStart
    if (count > 0) {
      return squareHandler.squareResponse("right", faces.sweating);
    } else {
      return squareHandler.squareResponse("left", faces.yelling);
    }
  },
  mouseDown: (whichNum, squareProps) => {
    console.log("clicking " + squareProps.id);
    console.log(squareProps.sq);
    if (whichNum === 1) {
      //left click
      if (squareProps.flagged) {
        //no change if flagged
        return squareHandler.squareResponse("left", faces.smiling);
      } else {
        //yell until mouse release
        return squareHandler.squareResponse("left", faces.yelling);
      }
    } else {
      //flag placement
      return squareHandler.squareResponse("right", faces.sweating);
    }
  },
};

//returns { square: updated square, face: new face }
export const leftClick = (sq) => {
  if (sq.flagged || sq.revealed) {
    return { square: sq, face: faces.smiling };
  } else {
    if (sq.ant) {
      return {
        square: {
          ...sq,
          display: squares.ant,
          revealed: true,
        },
        face: faces.upsideDown,
      };
    } else {
      return {
        square: {
          ...sq,
          display: squares.clicked,
          revealed: true,
        },
        face: faces.smiling,
      };
    }
  }
};

//returns { square: updated square, face: new face }
export const rightClick = (sq) => {
  if (sq.flagged) {
    return {
      square: {
        ...sq,
        display: squares.unclicked,
        revealed: false,
        flagged: false,
      },
      face: faces.smiling,
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
    };
  }
};
