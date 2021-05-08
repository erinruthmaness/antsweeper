import { squares } from "./icons";
import { shuffle } from "./helpers";

//define what each "square" should start out with in Board state
export const buildSquare = (col, row) => {
  return {
    key: "cell-" + col + "-" + row,
    col: col,
    row: row,
    ant: false,
    revealed: false,
    display: squares.unclicked,
    flagged: false,
  };
};

//make an array of arrays of "squares"
export const buildInitBoard = (cols, rows) => {
  return Array.from(Array(cols), (col, colIndex) => {
    return Array.from(Array(rows), (row, rowIndex) =>
      buildSquare(colIndex, rowIndex)
    );
  });
};

//make an array of true bools
//with falses equal to the number of ants shuffled in
export const buildAnthill = (length, ants) => {
  let starterArray = Array.from(Array(length), (square, idx) => {
    return { id: idx + 1, ant: false };
  });
  for (let i = 0; i < ants; i++) {
    starterArray[i].ant = true;
  }
  return shuffle(starterArray);
};

//called by Board
export const assignAnts = ({ cols, rows, ants }) => {
  let initBoard = buildInitBoard(cols, rows);
  let antArray = buildAnthill(cols * rows, ants);
  let counter = cols * rows - 1;
  initBoard.forEach((row) => {
    row.forEach((cell) => {
      cell.ant = antArray[counter].ant;
      counter--;
    });
  });
  return initBoard;
};
