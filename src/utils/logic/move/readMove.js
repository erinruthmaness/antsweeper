import * as roundUtils from "utils/logic/round/updateRound";
import { firstClick } from "utils/logic/board/createBoard";
import { moveReducer } from "utils/reducers/moveReducer";

export const readMove = ({ y, x, clickType, isFirstClick = false }, boardState, roundState) => {
    let boardPayload = { ...boardState };
    let roundAction = { type: undefined };

    if (!roundState.started) {
        const { board, antList } = firstClick(boardState, y, x);
        boardPayload.board = board;
        roundAction.payload = antList;
        roundAction.type = "START_ROUND";
    }
    const boardParams = {
        rows: boardState.board.length,
        cols: boardState.board[0].length,
        numAnts: boardState.flags,
        antList: roundState.started ? roundState.antList : roundAction.payload.antList,
    };
    const { newBoardState, gameOver, gameWon } = moveReducer({ ...boardPayload }, boardParams, {
        type: clickType,
        payload: boardState.board[y][x],
    });

    boardPayload = { ...boardPayload, ...newBoardState };

    if (gameOver) {
        if (gameWon) {
            roundAction.type = "WON";
            roundUtils.end.won();
        } else {
            roundAction.type = "LOST";
            roundUtils.end.lost();
        }
    }
    return { roundAction, boardPayload };
};
