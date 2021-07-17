import { faces } from "../../imgs/icons";

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