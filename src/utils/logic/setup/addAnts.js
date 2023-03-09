import { shuffle } from "../helpers";
import buildNeighborhood from "./buildNeighborhood";

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

//spread ants randomly through new board
const assignAnts = (boardState) => {
  let boardArea = boardState.parameters.rows * boardState.parameters.cols;
  let antArray = buildAnthill(boardArea, boardState.parameters.ants);
  let counter = boardArea - 1;
  let antMasterlist = [];
  boardState.board.forEach((row) => {
    row.forEach((cell) => {
      cell.ant = antArray[counter].ant;
      counter--;
      if (cell.ant) {
        antMasterlist.push(cell.key);
      }
    });
  });

  return [boardState.board, antMasterlist];
};

//count adjacent ants
//and keep track of which all adjacent squares
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

const antInFirstClick = (antList, reservedNeighborhood) => {
  let foundMatch = false;
  reservedNeighborhood.forEach((sq) => {
    if (sq !== null && antList.some((el) => el === sq.key)) {
      foundMatch = true;
    }
  });
  return foundMatch;
};

const addAnts = (boardState, reservedNeighborhood) => {
  let newBoard = boardState.board;
  let antList = [];
  do {
    [newBoard, antList] = assignAnts(boardState);
  } while (antInFirstClick(antList, reservedNeighborhood));
  return [findNeighbors(newBoard), antList];
};

export default addAnts;
