import { squares } from "./icons";
import { shuffle, buildNeighborhood } from "./helpers";

//define what each "square" should start out with in Board state
const buildSquare = (col, row) => {
  return {
    key: "cell-" + col + "-" + row,
    col: col,
    row: row,
    ant: false,
    revealed: false,
    display: squares.unclicked,
    flagged: false,
    neighbors: 0,
  };
};

//make an array of arrays of "squares"
const buildBlankBoard = (cols, rows) => {
  return Array.from(Array(cols), (col, colIndex) => {
    return Array.from(Array(rows), (row, rowIndex) =>
      buildSquare(colIndex, rowIndex)
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
  return initBoard;
};

const findNeighbors = (board) => {
  console.log("hold up");
  board.forEach((row, thisRow) => {
    console.log("row #" + thisRow);
    row.forEach((cell, thisCol) => {
      console.log("col #" + thisCol);
      console.log(cell);
      let numAnts = 0;
      let neighborhood = buildNeighborhood(board, thisRow, thisCol);
      console.log(neighborhood);
      neighborhood.forEach((square) => {
        if (square && square.ant) {
          numAnts++;
        }
      });
      cell.neighbors = numAnts;
      console.log(cell);
    });
  });
  return board;
};

//called by Board
export const boardBuilder = ({ cols, rows, ants }) => {
  let blankBoard = buildBlankBoard(cols, rows);
  console.log(blankBoard);
  let boardWAnts = assignAnts(blankBoard, cols * rows, ants);
  console.log(boardWAnts);
  let finalBoard = findNeighbors(boardWAnts);
  console.log(finalBoard);
  return finalBoard;
};
