import { faces } from "imgs/icons";

// returns { which: "left"/"right", face : "[face code]"}
const squareResponse = (whichClick, whichFace) => {
    return { which: whichClick, face: whichFace };
};

export const touchStart = (flagged) => {
    if (flagged) {
        return squareResponse("touchStart", faces.winking);
    } else {
        return squareResponse("touchStart", faces.yelling);
    }
};

export const touchEnd = (count) => {
    console.log("touch end count is " + count);
    //since touchStart doesn't put the face back on :D like mouseDown does
    //touchEnd has to do it!
    if (count > 0) {
        return squareResponse("right", faces.smiling);
    } else {
        return squareResponse("left", faces.smiling);
    }
};

export const mouseDown = (mouseButton, squareProps) => {
    if (mouseButton === 0) {
        //left click
        if (squareProps.flagged) {
            return squareResponse("left", faces.winking);
        } else {
            //yell until mouse release
            return squareResponse("left", faces.yelling);
        }
    } else {
        if (squareProps.flagged) {
            //removing flag
            return squareResponse("right", faces.sweating);
        } else {
            //flag placement
            return squareResponse("right", faces.smiling);
        }
    }
};
