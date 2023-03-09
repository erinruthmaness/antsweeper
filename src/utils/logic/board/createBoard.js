import { shuffle } from "utils/logic/helpers";
import buildSquare from "utils/logic/buildSquare";

//make an array of arrays of "squares"
export const buildBoard = (rows, cols) => {
    return Array.from(Array(rows), (row, y) => {
        return Array.from(Array(cols), (col, x) => buildSquare(x, y));
    });
};

//make an array of true bools
//with falses equal to the number of ants shuffled in
const buildAnthill = (boardArea, numAnts) => {
    let starterArray = Array.from(Array(boardArea), (square, idx) => {
        return { id: idx + 1, ant: false };
    });
    for (let i = 0; i < numAnts; i++) {
        starterArray[i].ant = true;
    }
    return shuffle(starterArray);
};

//spread ants randomly through new board
const assignAnts = (boardState) => {
    const boardArea = boardState.board[0].length * boardState.board.length;
    const antArray = buildAnthill(boardArea, boardState.flags);
    let counter = boardArea - 1;
    let antMasterList = [];

    const boardWithAnts = boardState.board.map((row) => {
        return row.map((cell) => {
            cell.ant = antArray[counter].ant;
            counter--;
            if (cell.ant) {
                antMasterList.push(cell.key);
            }
            return cell;
        });
    });

    return { antMasterList, boardWithAnts };
};

//count adjacent ants
//and keep track of which all adjacent squares
const findNeighbors = (board) => {
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            let numAnts = 0;
            let neighborhood = buildNeighborhood(board, y, x);
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

//takes an array and an index and returns
//[the value of the index before, the specified index, and the next index]
//or null if there is no index before or after
// (sort of like array.slice but replacing a non-existent or negative index with null)
const horizontalNeighbors = (y, myIndex) => {
    return [
        myIndex - 1 >= 0 ? y[myIndex - 1] : null,
        y[myIndex],
        myIndex + 1 < y.length ? y[myIndex + 1] : null,
    ];
};

//takes an array of arrays and specified "row" and "col" indeces
//and returns an array of nine values: essentially the value of the specified "cell"
//and the values of all the cells that "touch" it in the "grid"
const buildNeighborhood = (wholeBoard, y, x) => {
    let rowAbove =
        y - 1 >= 0
            ? horizontalNeighbors(wholeBoard[y - 1], x)
            : [null, null, null];
    let myRow = horizontalNeighbors(wholeBoard[y], x);
    let rowBelow =
        y + 1 < wholeBoard.length
            ? horizontalNeighbors(wholeBoard[y + 1], x)
            : [null, null, null];
    return rowAbove.concat(myRow, rowBelow);
};

const addAnts = (boardState, reservedNeighborhood) => {
    let newBoard = boardState.board;
    let antList;
    do {
        const { antMasterList, boardWithAnts } = assignAnts(boardState);
        antList = antMasterList;
        newBoard = boardWithAnts;
    } while (antInFirstClick(antList, reservedNeighborhood));

    return {
        ...boardState,
        board: findNeighbors(newBoard),
        antList,
    };
};

export const firstClick = (boardState, y, x) => {
    const clickedNeighborhood = buildNeighborhood(boardState.board, y, x);

    return addAnts(boardState, clickedNeighborhood);
};
