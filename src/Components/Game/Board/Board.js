import { useCallback, useReducer } from "react";

import boardReducer from "../../../utils/reducers/boardReducer";
import roundReducer from "../../../utils/reducers/roundReducer";

import Controls from "../Controls/Controls";
import SquaresWrapper from "../SquaresWrapper/SquaresWrapper";

import { faces } from "../../../utils/logic/icons";
import buildBlankBoard from "../../../utils/logic/setup/buildBlankBoard";
import buildNeighborhood from "../../../utils/logic/setup/buildNeighborhood";
import addAnts from "../../../utils/logic/setup/addAnts";
import { boardHandler } from "../../../utils/logic/read";
import {
  uncoverNeighbors,
  checkForWin,
  detonateAnts,
} from "../../../utils/logic/update";

import styles from "./Board.module.css";

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
    //clear out previous round (if applicable)
    dispatchBoard({ type: "CLEAR_BOARD" });
    //let [newBoard, ants] = boardBuilder(boardState.parameters);
    //fills out the board with uncovered squares, but no ants yet
    dispatchBoard({
      type: "UNCOVER_BOARD",
      payload: {
        board: buildBlankBoard(boardState.parameters.rows, boardState.parameters.cols),
        parameters: { ...boardState.parameters },
        flags: boardState.parameters.ants,
      },
    });
    dispatchRound({ type: "BOARD_SET" });
  };

  const handleSquareClick = useCallback(
    (rowIndex, colIndex, whichClick) => {
      //first click
      if (!roundState.started) {
        let clickedNeighborhood = buildNeighborhood(boardState.board, rowIndex, colIndex);
        let [boardWithAnts, antList] = addAnts(boardState, clickedNeighborhood);
        dispatchBoard({
          type: "SET_ANTS",
          payload: {
            board: boardWithAnts,
            parameters: {
              ...boardState.parameters,
              antList: antList
            }
          }
        })
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
        //if an ant was uncovered
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
