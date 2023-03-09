import { faces } from "imgs/icons";
import { checkForWin } from "utils/logic/round/readRound";
import * as updateBoard from "utils/logic/board/updateBoard";

export const moveReducer = (boardState, params, action) => {
    let newBoardState = {};
    const newRoundStatus = {
        gameOver: false,
        gameWon: false,
    };
    switch (action.type) {
        case "LEFT_CLICK":
            if (action.payload.flagged || action.payload.revealed) {
                newBoardState = updateBoard.doNothing(boardState);
            } else if (action.payload.ant) {
                newBoardState = updateBoard.uncoverAnt(
                    action.payload,
                    boardState.board,
                    params.antList
                );
                newRoundStatus.gameOver = true;
            } else {
                newBoardState = updateBoard.uncoverSquare(boardState, action.payload);
                if (checkForWin(newBoardState.board, params)) {
                    newBoardState.face = faces.shades;
                    newRoundStatus.gameOver = true;
                    newRoundStatus.gameWon = true;
                }
            }
            break;
        case "RIGHT_CLICK":
            if (action.payload.flagged) {
                newBoardState = updateBoard.removeFlag(boardState, action.payload);
            } else if (boardState.flags > 0) {
                //placing a flag
                newBoardState = updateBoard.placeFlag(boardState, action.payload);
            } else {
                newBoardState = updateBoard.doNothing(newBoardState);
            }
            break;
        default:
            console.log("squareClick reducer error: ", action.type);
            return;
    }
    return { newBoardState, ...newRoundStatus };
};
