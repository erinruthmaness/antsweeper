import { useCallback, useReducer } from "react";

import Controls from "../Controls/Controls";
import SquaresWrapper from "../SquaresWrapper/SquaresWrapper";

import { faces } from "../utils/icons";
import { boardBuilder } from "../utils/create";
import { boardHandler } from "../utils/read";
import { uncoverNeighbors, checkForWin, detonateAnts } from "../utils/update";

import styles from "./Board.module.css";

const boardReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_BOARD":
      return { ...state, board: [] };
    case "SET_ROUND":
      return {
        ...state,
        ...action.payload,
        face: faces.smiling,
      };
    case "UPDATE_BOARD":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_FACE":
      return {
        ...state,
        face: action.payload,
      };
    default:
      return { ...state };
  }
};

const roundReducer = (state, action) => {
  switch (action.type) {
    case "BOARD_SET":
      return { ...state, ready: true };
    case "START_ROUND":
      console.log("okay you started!");
      return { ...state, started: false };
    case "WON":
    case "LOST":
      return { ...state, ready: false };
    default:
      return { ...state };
  }
};

const Board = () => {
  const initialState = {
    board: [],
    parameters: {
      rows: 8,
      cols: 8,
      ants: 10,
      antList: [],
    },
    flags: 0,
    face: faces.sleeping,
  };
  const [boardState, dispatchBoard] = useReducer(boardReducer, initialState);
  const [roundState, dispatchRound] = useReducer(roundReducer, {
    ready: false,
    started: false,
  });

  const onStart = () => {
    dispatchBoard({ type: "CLEAR_BOARD" });
    let [newBoard, ants] = boardBuilder(boardState.parameters);
    dispatchBoard({
      type: "SET_ROUND",
      payload: {
        board: newBoard,
        parameters: { ...boardState.parameters, antList: ants },
        flags: boardState.parameters.ants,
      },
    });
    dispatchRound({ type: "BOARD_SET" });
  };

  const handleSquareClick = useCallback(
    (rowIndex, colIndex, whichClick) => {
      if (!roundState.started) {
        dispatchRound({ type: "START_ROUND" });
      }

      let updateGrid = [...boardState.board];
      let clickedSquare = boardState.board[rowIndex][colIndex];
      console.log("handling a " + whichClick + " click for:");
      console.log(clickedSquare);
      let updateAction = boardHandler.routeClick(
        clickedSquare,
        whichClick,
        boardState.flags
      );
      updateGrid[rowIndex][colIndex] = updateAction.square;
      if (updateAction.square.revealed) {
        //if the first ant was uncovered
        if (updateAction.square.ant) {
          dispatchRound({ type: "LOST" });
          updateGrid = detonateAnts(updateGrid, boardState.parameters.antList);
        }
        //if the last non-ant was uncovered
        if (
          checkForWin(updateGrid, boardState.parameters) &&
          !updateAction.square.ant
        ) {
          updateAction.face = faces.shades;
          dispatchRound({ type: "WON" });
        }
        //if a square with no nearby ants was uncovered
        if (updateAction.square.nearbyAnts === 0) {
          updateGrid = uncoverNeighbors(updateAction.square, updateGrid);
        }
      }
      dispatchBoard({
        type: "UPDATE_BOARD",
        payload: {
          board: updateGrid,
          face: updateAction.face,
          flags: updateAction.flags,
        },
      });
    },
    [boardState, roundState]
  );

  const handleFaceChange = (newFace) => {
    dispatchBoard({ type: "SET_FACE", payload: newFace });
  };

  return (
    <section className={styles.window__inner}>
      <div className={styles.board__outer}>
        <Controls
          startGame={onStart}
          inProgress={roundState.ready}
          face={boardState.face}
          flags={boardState.flags}
          firstClick={roundState.started}
        />
        <section className={styles.board__inner}>
          {boardState.board ? (
            <SquaresWrapper
              boardGrid={boardState.board}
              handleSquareClick={handleSquareClick}
              setFace={handleFaceChange}
              gameInProgress={roundState.ready}
            />
          ) : null}
        </section>
      </div>
    </section>
  );
};

export default Board;
