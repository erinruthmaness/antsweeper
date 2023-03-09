import { squares } from "../icons";

//define what each "square" should start out with in Board state
const buildSquare = (row, col) => {
  return {
    key: "cell-" + row + "-" + col,
    row: row,
    col: col,
    ant: false,
    revealed: false,
    display: squares.unclicked,
    flagged: false,
    nearbyAnts: 0,
    neighbors: [],
  };
};

//make an array of arrays of "squares"
const buildBlankBoard = (rows, cols) => {
  return Array.from(Array(rows), (row, rowIndex) => {
    return Array.from(Array(cols), (col, colIndex) =>
      buildSquare(rowIndex, colIndex)
    );
  });
};

export default buildBlankBoard;
