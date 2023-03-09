import { squares } from "./icons";

export const uncoverNeighbors = (startingSquare, board) => {
  //assumes a nearbyAnts === 0 starting square
  let updatedBoard = board;
  startingSquare.neighbors.forEach((sq) => {
    if (!board[sq.row][sq.col].revealed) {
      board[sq.row][sq.col] = {
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

export const recursiveUncover = (centerSquare, board) => {
  centerSquare.neighbors.forEach((sq) => {
    if (!board[sq.row][sq.col].revealed) {
      board[sq.row][sq.col] = {
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

export const checkForWin = (board, gameParams) => {
  let unclickedSafe = gameParams.rows * gameParams.cols - gameParams.ants;
  board.forEach((row, rowIndex) => {
    board.forEach((col, colIndex) => {
      if (
        !board[rowIndex][colIndex].ant &&
        board[rowIndex][colIndex].revealed
      ) {
        unclickedSafe--;
      }
    });
  });
  if (unclickedSafe === 0) {
    return true;
  } else {
    return false;
  }
};

export const detonateAnts = (board, allAnts) => {
  board.forEach((row, rowIndex) => {
    board.forEach((col, colIndex) => {
      if (
        (allAnts.indexOf(board[rowIndex][colIndex].key) !== -1) &&
        !board[rowIndex][colIndex].revealed &&
        !board[rowIndex][colIndex].flagged
      ) {
        board[rowIndex][colIndex] = {
          ...board[rowIndex][colIndex],
          display: squares.ant,
          revealed: true,
          unclickedAnt: true,
        };
      }
    });
  });
  return board;
};
