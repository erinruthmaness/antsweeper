import { squares } from "./icons";
import { shuffle, buildNeighborhood } from "./helpers";

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

//make an array of true bools
//with falses equal to the number of ants shuffled in
const buildAnthill = (length, ants) => {
  let starterArray = Array.from(Array(length), (square, idx) => {
    return { id: idx + 1, ant: false };
  });
  for (let i = 0; i < ants; i++) {
    starterArray[i].ant = true;
  }
  return shuffle(starterArray);
};

const assignAnts = (initBoard, cellCount, numAnts) => {
  let antArray = buildAnthill(cellCount, numAnts);
  let counter = cellCount - 1;
  initBoard.forEach((row) => {
    row.forEach((cell) => {
      cell.ant = antArray[counter].ant;
      counter--;
    });
  });
  return findNeighbors(initBoard);
};

const findNeighbors = (board) => {
  board.forEach((row, thisRow) => {
    row.forEach((cell, thisCol) => {
      let numAnts = 0;
      let neighborhood = buildNeighborhood(board, thisRow, thisCol);
      neighborhood.forEach((square) => {
        if (square && square.ant) {
          numAnts++;
        }
      });
      cell.nearbyAnts = numAnts;
      cell.neighbors = neighborhood.filter((el) => el !== null);
    });
  });
  return board;
};

//called by Board
export const boardBuilder = ({ rows, cols, ants }) => {
  let starterBoard = buildBlankBoard(rows, cols)
  return assignAnts(starterBoard, rows * cols, ants);
};
