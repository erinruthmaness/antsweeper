import { detonateAnts } from "./endRound";
import { squares, faces } from "../../../../imgs/icons";

//returns { square: {updated square}, face: [face code] }
// const clickHandler = {
//   routeClick: (clickedSquare, whichClick, remFlags) => {
//     if (whichClick === "left") {
//       return clickHandler.leftClick(clickedSquare, remFlags);
//     } else if (whichClick === "right") {
//       return clickHandler.rightClick(clickedSquare, remFlags);
//     }
//   },
//   leftClick: (sq, remFlags) => {
//     if (sq.flagged || sq.revealed) {
//       return { square: sq, face: faces.smiling };
//     } else {
//       if (sq.ant) {
//         return {
//           square: {
//             ...sq,
//             display: squares.ant,
//             revealed: true,
//           },
//           face: faces.exploded,
//           flags: remFlags,
//         };
//       } else {
//         return {
//           square: {
//             ...sq,
//             display: sq.nearbyAnts === 0 ? "" : sq.nearbyAnts,
//             revealed: true,
//           },
//           face: faces.smiling,
//           flags: remFlags,
//         };
//       }
//     }
//   },
//   rightClick: (sq, remFlags) => {
//     //removing a flag
//     if (sq.flagged) {
//       return {
//         square: {
//           ...sq,
//           display: squares.unclicked,
//           revealed: false,
//           flagged: false,
//         },
//         face: faces.smiling,
//         flags: remFlags + 1,
//       };
//     } else {
//       if (remFlags > 0) {
//         return {
//           square: {
//             ...sq,
//             display: squares.flag,
//             revealed: false,
//             flagged: true,
//           },
//           face: faces.smiling,
//           flags: remFlags - 1,
//         };
//       } else {
//         //player can't place more flags than ants
//         return {
//           square: { ...sq },
//           face: faces.smiling,
//           flags: remFlags,
//         };
//       }
//     }
//   },
// };

const checkForWin = (board, gameParams) => {
  let unclickedSafe = gameParams.rows * gameParams.cols - gameParams.ants;
  board.forEach((row, y) => {
    board.forEach((col, x) => {
      if (!board[y][x].ant && board[y][x].revealed) {
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

const replaceSquareInBoard = (board, newSquare) => {
  console.log("new square:");
  console.log(newSquare);
  let tempBoard = [...board];
  tempBoard[newSquare.y][newSquare.x] = newSquare;
  return [...tempBoard];
};

const playerMoveReducer = (boardState, action) => {
  console.log(action);
  switch (action.type) {
    case "LEFT_CLICK":
      if (action.payload.flagged || action.payload.revealed) {
        //flagged or revealed square clicked (no action)
        return {
          newBoardState: {
            ...boardState,
            face: faces.smiling,
          },
          gameOver: false,
        };
      } else if (action.payload.ant) {
        //ant uncovered (game over)
        const tempBoard = replaceSquareInBoard(boardState.board, {
          ...action.payload,
          display: squares.ant,
          revealed: true,
        });
        return {
          newBoardState: {
            ...boardState,
            board: detonateAnts(tempBoard, boardState.parameters.antList),
            face: faces.exploded,
          },
          gameOver: true,
        };
      } else {
        //non-ant uncovered
        let tempFace = faces.smiling;
        let tempGameOver = false;
        let tempBoard = replaceSquareInBoard(boardState.board, {
          ...action.payload,
          display:
            action.payload.nearbyAnts === 0 ? "" : action.payload.nearbyAnts,
          revealed: true,
        });
        if (checkForWin(boardState.board, boardState.parameters)) {
          tempFace = faces.shades;
          tempGameOver = true;
        }
        if (action.payload.nearbyAnts === 0) {
          tempBoard = uncoverNeighbors(action.payload, tempBoard);
        }
        return {
          newBoardState: {
            ...boardState,
            board: tempBoard,
            face: tempFace,
          },
          gameOver: tempGameOver,
        };
      }
    case "RIGHT_CLICK":
      if (action.payload.flagged) {
        //removing a flag
        return {
          newBoardState: {
            ...boardState,
            board: replaceSquareInBoard(boardState.board, {
              ...action.payload,
              display: squares.unclicked,
              revealed: false,
              flagged: false,
            }),
            face: faces.smiling,
            flags: boardState.flags + 1,
          },
          gameOver: false,
        };
      } else if (boardState.flags > 0) {
        //placing a flag
        return {
          newBoardState: {
            ...boardState,
            board: replaceSquareInBoard(boardState.board, {
              ...action.payload,
              display: squares.flag,
              revealed: false,
              flagged: true,
            }),
            face: faces.smiling,
            flags: boardState.flags - 1,
          },
          gameOver: false,
        };
      } else {
        //player can't place more flags than ants
        return {
          newBoardState: {
            ...boardState,
            face: faces.smiling,
          },
          gameOver: false,
        };
      }
    default:
      console.log("squareClick reducer error: ", action.type);
      return;
  }
};

export default playerMoveReducer;
