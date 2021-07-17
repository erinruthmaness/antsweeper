import { useCallback, useContext, useEffect, useReducer } from "react";

import paramsContext from "../../../utils/store/paramsContext";
import boardReducer from "../../../utils/reducers/boardReducer";
import getInitialBoard from "../../../utils/store/initialState/board";

import Controls from "../Controls/Controls";
import RowWrapper from "../RowWrapper/RowWrapper";

import { faces } from "../../../imgs/icons";
import newRound from "./logic/newRound";
import startRound from "./logic/startRound";

import playerMoveReducer from "./logic/clickHandler";
// import clickHandler from "./logic/clickHandler";
// import { checkForWin } from "../../../utils/logic/playerMove/checkForWin";
// import uncoverNeighbors from "../../../utils/logic/playerMove/uncoverNeighbors";
// import { detonateAnts } from "../../../utils/logic/gameOver/detonateAnts";

import styles from "./Board.module.css";
import roundContext from "../../../utils/store/roundContext";
import endRound from "./logic/endRound";

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
        board: newRound(boardState.parameters.rows, boardState.parameters.cols),
        parameters: { ...boardState.parameters },
        flags: boardState.parameters.ants,
      },
    });
    roundCtx.set.ready();
  };

  const handleSquareClick = useCallback(
    (y, x, clickType) => {
      //first click
      if (!roundCtx.started) {
        let [boardWithAnts, antList] = startRound(boardState, y, x);
        console.log(boardWithAnts);
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
      // console.log(rowIndex, colIndex, whichClick);
      console.log(boardState.board[y][x]);
      // let updateGrid = [...boardState.board];
      let { newBoardState, gameOver } = playerMoveReducer(
        { ...boardState },
        { type: clickType, payload: boardState.board[y][x] }
      );
      // let newClickedSquare =
      // newBoardState[clickedSquare.row][clickedSquare.col];
      // let updateAction = clickHandler.routeClick(
      //   clickedSquare,
      //   whichClick,
      //   boardState.flags
      // );

      // updateGrid[rowIndex][colIndex] = updateAction.square;
      // if (updateAction.square.revealed) {
      //if an ant was uncovered
      // if (updateAction.square.ant) {
      // if (newClickedSquare.ant) {
      if (gameOver && newBoardState.face === faces.exploded) {
        roundCtx.set.lost();
        endRound.lost();
        // updateGrid = detonateAnts(updateGrid, boardState.parameters.antList);
      } else if (gameOver && newBoardState.face === faces.shades) {
        //if the last non-ant was uncovered
        // updateAction.face = faces.shades;
        roundCtx.set.won();
        endRound.won();
      }
      //if a square with no nearby ants was uncovered
      // if (updateAction.square.nearbyAnts === 0) {
      //   updateGrid = uncoverNeighbors(updateAction.square, updateGrid);
      // }
      // }
      dispatchBoard({
        type: "UPDATE_BOARD",
        payload: {
          board: newBoardState.board,
          face: newBoardState.face,
          flags: newBoardState.flags,
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
  }, [
    paramCtx.level,
    boardState.level,
    boardState.board,
    roundCtx,
    restartRound,
  ]);
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
