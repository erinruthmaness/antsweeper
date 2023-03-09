import { squares, faces } from "imgs/icons";

const replaceSquareInBoard = (board, newSquare) => {
    let tempBoard = [...board];
    tempBoard[newSquare.y][newSquare.x] = newSquare;
    return [...tempBoard];
};

const recursiveUncover = (centerSquare, board) => {
    centerSquare.neighbors.forEach((sq) => {
        if (!board[sq.y][sq.x].revealed) {
            board[sq.y][sq.x] = {
                ...sq,
                revealed: true,
                display: sq.nearbyAnts === 0 ? "" : sq.nearbyAnts,
            };
            if (sq.nearbyAnts === 0) {
                board = recursiveUncover(sq, board);
            }
        }
    });
    return board;
};

const detonateAnts = (board, allAnts) => {
    board.forEach((row, y) => {
        board.forEach((col, x) => {
            if (
                allAnts.indexOf(board[y][x].key) !== -1 &&
                !board[y][x].revealed &&
                !board[y][x].flagged
            ) {
                board[y][x] = {
                    ...board[y][x],
                    display: squares.ant,
                    revealed: true,
                    unclickedAnt: true,
                };
            }
        });
    });
    return board;
};

const uncoverNeighbors = (startingSquare, board) => {
    //assumes a nearbyAnts === 0 starting square
    let updatedBoard = board;
    startingSquare.neighbors.forEach((sq) => {
        if (!board[sq.y][sq.x].revealed) {
            board[sq.y][sq.x] = {
                ...sq,
                revealed: true,
                display: sq.nearbyAnts === 0 ? "" : sq.nearbyAnts,
            };
            if (sq.nearbyAnts === 0) {
                board = recursiveUncover(sq, board);
            }
        }
    });
    return updatedBoard;
};

export const doNothing = (boardState) => {
    const newBoardState = { ...boardState };

    return { ...newBoardState, face: faces.smiling };
};

export const uncoverAnt = (clickedSquare, currentBoard, antList) => {
    currentBoard = replaceSquareInBoard(currentBoard, {
        ...clickedSquare,
        display: squares.ant,
        revealed: true,
    });
    const newBoard = detonateAnts(currentBoard, antList);

    return { board: newBoard, face: faces.exploded };
};

export const uncoverSquare = (boardState, clickedSquare) => {
    const newBoardState = { ...boardState };

    newBoardState.board = replaceSquareInBoard(boardState.board, {
        ...clickedSquare,
        display: clickedSquare.nearbyAnts === 0 ? "" : clickedSquare.nearbyAnts,
        revealed: true,
    });
    if (clickedSquare.nearbyAnts === 0) {
        newBoardState.board = uncoverNeighbors(clickedSquare, newBoardState.board);
    }
    return { ...newBoardState, face: faces.smiling };
};

export const removeFlag = (boardState, clickedSquare) => {
    const newBoardState = { ...boardState };

    newBoardState.board = replaceSquareInBoard(boardState.board, {
        ...clickedSquare,
        display: squares.unclicked,
        revealed: false,
        flagged: false,
    });
    newBoardState.flags++;
    return { ...newBoardState, face: faces.smiling };
};

export const placeFlag = (boardState, clickedSquare) => {
    const newBoardState = { ...boardState };

    newBoardState.board = replaceSquareInBoard(boardState.board, {
        ...clickedSquare,
        display: squares.flag,
        revealed: false,
        flagged: true,
    });
    newBoardState.flags--;
    return { ...newBoardState, face: faces.smiling };
};
