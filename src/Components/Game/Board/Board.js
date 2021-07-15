import { useCallback, useContext, useEffect, useReducer } from "react";

import paramsContext from "../../../utils/store/paramsContext";
import boardReducer from "../../../utils/reducers/boardReducer";
import getInitialBoard from "../../../utils/store/initialState/board";

import Controls from "../Controls/Controls";
import RowWrapper from "../RowWrapper/RowWrapper";

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
import roundContext from "../../../utils/store/roundContext";

const Board = () => {
  const paramCtx = useContext(paramsContext);
  const roundCtx = useContext(roundContext);

  const [boardState, dispatchBoard] = useReducer(
    boardReducer,
    getInitialBoard(paramCtx)
  );

  const restartRound = useCallback(() => {
    dispatchBoard({
      type: "RESET_BOARD",
      payload: getInitialBoard(paramCtx),
    });
    roundCtx.set.reset();
  }, [paramCtx, roundCtx.set]);

  const onStart = () => {
    //let happy onStart face restart a game in progress
    if (roundCtx.started) {
      restartRound();
    }
    //clear out previous round (if applicable)
    dispatchBoard({ type: "CLEAR_BOARD" });
    //fills out the board with uncovered squares, but no ants yet
    dispatchBoard({
      type: "UNCOVER_BOARD",
      payload: {
        board: buildBlankBoard(
          boardState.parameters.rows,
          boardState.parameters.cols
        ),
        parameters: { ...boardState.parameters },
        flags: boardState.parameters.ants,
      },
    });
    roundCtx.set.ready();
  };

  const handleSquareClick = useCallback(
    (rowIndex, colIndex, whichClick) => {
      //first click
      if (!roundCtx.started) {
        let clickedNeighborhood = buildNeighborhood(
          boardState.board,
          rowIndex,
          colIndex
        );
        let [boardWithAnts, antList] = addAnts(boardState, clickedNeighborhood);
        dispatchBoard({
          type: "SET_ANTS",
          payload: {
            board: boardWithAnts,
            parameters: {
              ...boardState.parameters,
              antList: antList,
            },
          },
        });
        roundCtx.set.start();
      }

      let updateGrid = [...boardState.board];
      let clickedSquare = boardState.board[rowIndex][colIndex];
      // console.log("handling a " + whichClick + " click for:");
      // console.log(clickedSquare);
      let updateAction = boardHandler.routeClick(
        clickedSquare,
        whichClick,
        boardState.flags
      );
      updateGrid[rowIndex][colIndex] = updateAction.square;
      if (updateAction.square.revealed) {
        //if an ant was uncovered
        if (updateAction.square.ant) {
          roundCtx.set.lost();
          updateGrid = detonateAnts(updateGrid, boardState.parameters.antList);
        }
        //if the last non-ant was uncovered
        if (
          checkForWin(updateGrid, boardState.parameters) &&
          !updateAction.square.ant
        ) {
          updateAction.face = faces.shades;
          roundCtx.set.won();
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
    [boardState, roundCtx]
  );

  const handleFaceChange = (newFace) => {
    dispatchBoard({ type: "SET_FACE", payload: newFace });
  };

  useEffect(() => {
    //reset board if the level has changed or if the round shouldn't be started
    if (
      paramCtx.level !== boardState.level ||
      (!roundCtx.ready && !roundCtx.started && boardState.board.length > 0)
    ) {
      restartRound();
    }
  }, [paramCtx.level, boardState.level, boardState.board, roundCtx, restartRound]);
  return (
    <article className={styles.gameWrapper}>
        <Controls
          startGame={onStart}
          inProgress={roundCtx.ready}
          face={boardState.face}
          flags={boardState.flags}
          firstClick={roundCtx.started}
        />
        <section className={styles.boardWrapper}>
          {boardState.board ? (
            <RowWrapper
              boardGrid={boardState.board}
              handleSquareClick={handleSquareClick}
              setFace={handleFaceChange}
              gameInProgress={roundCtx.ready}
            />
          ) : null}
        </section>
    </article>
  );
};

export default Board;
