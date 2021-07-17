import { squares } from "../../../../imgs/icons";

export const detonateAnts = (board, allAnts) => {
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

const endRound = {
  won: () => {
    console.log("yeah");
  },
  lost: () => {
    console.log("oh no");
    // return {
    //   ...boardState,
    //   board: detonateAnts(boardState.board, boardState.parameters.antList),
    // };
  },
};

export default endRound;
