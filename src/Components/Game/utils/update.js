export const uncoverZeros = {
  start: (row, col, board) => {
    let updatedBoard = board;
    let alreadyChecked = [];
    // let uncoverables = [];
    console.log("kickoff");
    [updatedBoard] = uncoverZeros.uncoverRow(row, col, board, alreadyChecked);
    return updatedBoard;
  },
  uncoverRow: (row, startingCol, board, checklist) => {
    console.log(board);
    //start at the current square and iterate to the left
    for (let thisCol = startingCol; thisCol >= 0; thisCol--) {
      //uncover every zero square and its surroundings until you uncover one that isn't zero
      if (board[row][thisCol].nearbyAnts === 0) {
        board = uncoverZeros.uncoverSelfAndNeighbors(
          board[row][thisCol],
          board
        );
        if (!checklist.includes(board[row][thisCol].key + "-row-left")) {
          //also uncover as much of the column as you can if this square hasn't already been done
          [board, checklist] = uncoverZeros.uncoverColumn(
            thisCol,
            row,
            board,
            checklist
          );
          checklist.push(board[row][thisCol].key + "-row-left");
        }
      } else {
        break;
      }
    }
    //start at the current square and iterate to the right
    for (let thisCol = startingCol; thisCol < board[row].length; thisCol++) {
      //uncover every zero square and its surroundings until you uncover one that isn't zero
      if (
        board[row][thisCol].nearbyAnts === 0 &&
        !checklist.includes(board[row][thisCol].key)
      ) {
        board = uncoverZeros.uncoverSelfAndNeighbors(
          board[row][thisCol],
          board
        );
        checklist.push(board[row][thisCol].key);
        if (!checklist.includes(board[row][thisCol].key + "-row-right")) {
          // also uncover as much of the adjacent columns as you can
          [board, checklist] = uncoverZeros.uncoverColumn(
            thisCol,
            row,
            board,
            checklist
          );
          checklist.push(board[row][thisCol].key + "-row-right");
        }
      } else {
        break;
      }
    }
    return [board, checklist];
  },
  uncoverColumn: (col, startingRow, board, checklist) => {
    console.log(board);
    //start at the current square and iterate each cell in this column to the top
    //the number of arrays in the board is the number of rows
    for (let thisRow = startingRow; thisRow >= 0; thisRow--) {
      //uncover every zero square and its surroundings until you uncover one that isn't zero
      if (board[thisRow][col].nearbyAnts === 0) {
        board = uncoverZeros.uncoverSelfAndNeighbors(
          board[thisRow][col],
          board
        );
        checklist.push(board[thisRow][col].key);
        //also uncover as much of the adjacent rows as you can
        // if (!checklist.includes(board[thisRow][col].key + "-col-up"))
        //   [board, checklist] = uncoverZeros.uncoverRow(
        // thisRow,
        // col,
        // board,
        // checklist
        //   );
        // checklist.push(board[thisRow][col].key + "-col-up");
      } else {
        break;
      }
    }
    //start at the current square and iterate each cell in this column to the bottom
    for (let thisRow = startingRow; thisRow < board.length; thisRow++) {
      //uncover every zero square and its surroundings until you uncover one that isn't zero
      if (board[thisRow][col].nearbyAnts === 0) {
        board = uncoverZeros.uncoverSelfAndNeighbors(
          board[thisRow][col],
          board
        );
        //also uncover as much of the adjacent rows as you can
        // if (!checklist.includes(board[thisRow][col].key + "-col-down")) {
        //   [board, checklist] = uncoverZeros.uncoverRow(
        // thisRow,
        // col,
        // board,
        // checklist
        //   );
        //   checklist.push(board[thisRow][col].key + "-col-down");
        // }
      } else {
        break;
      }
    }
    return [board, checklist];
  },
  uncoverSelfAndNeighbors: (middleSquare, wholeBoard) => {
    let updatedBoard = wholeBoard;
    updatedBoard[middleSquare.row][
      middleSquare.col
    ] = uncoverZeros.uncoverSquare(
      wholeBoard[middleSquare.row][middleSquare.col]
    );
    middleSquare.neighbors.forEach((neighborSq) => {
      updatedBoard[neighborSq.row][neighborSq.col] = uncoverZeros.uncoverSquare(
        wholeBoard[neighborSq.row][neighborSq.col]
      );
    });
    return updatedBoard;
  },
  uncoverSquare: (sq) => {
    return {
      ...sq,
      display: sq.nearbyAnts === 0 ? "" : sq.nearbyAnts,
      revealed: true,
    };
  },
};
