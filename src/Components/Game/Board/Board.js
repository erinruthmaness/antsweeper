import { useState, useCallback } from "react";

import Controls from "../Controls/Controls";
import SquaresWrapper from "../SquaresWrapper/SquaresWrapper";

import { faces } from "../utils/icons";
import { boardBuilder } from "../utils/create";
import { boardHandler } from "../utils/read";
import { uncoverNeighbors, checkForWin, detonateAnts } from "../utils/update";

import styles from "./Board.module.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameParams, setGameParams] = useState({
    rows: 8,
    cols: 8,
    ants: 10,
    antList: [],
  });
  const [face, setFace] = useState(faces.sleeping);
  const [flags, setFlags] = useState(0);

  const onStart = () => {
    setBoardGrid([]);
    let [board, ants] = boardBuilder(gameParams);
    setBoardGrid(board);
    setGameParams({ ...gameParams, antList: ants });
    setGameInProgress(true);
    setFace(faces.smiling);
    setFlags(gameParams.ants);
  };

  const handleSquareClick = useCallback(
    (rowIndex, colIndex, whichClick) => {
      let updateGrid = [...boardGrid];
      let clickedSquare = boardGrid[rowIndex][colIndex];
      console.log("handling a " + whichClick + " click for:");
      console.log(clickedSquare);
      let updateAction = boardHandler.routeClick(
        clickedSquare,
        whichClick,
        flags
      );
      updateGrid[rowIndex][colIndex] = updateAction.square;
      if (updateAction.square.revealed) {
        //if the first ant was uncovered
        if (updateAction.square.ant) {
          setGameInProgress(false);
          updateGrid = detonateAnts(updateGrid, gameParams.antList);
        }
        //if the last non-ant was uncovered
        if (checkForWin(updateGrid, gameParams) && !updateAction.square.ant) {
          updateAction.face = faces.shades;
          setGameInProgress(false);
        }
        //if a square with no nearby ants was uncovered
        if (updateAction.square.nearbyAnts === 0) {
          updateGrid = uncoverNeighbors(updateAction.square, updateGrid);
        }
      }
      setBoardGrid(updateGrid);
      setFace(updateAction.face);
      setFlags(updateAction.flags);
    },
    [boardGrid, flags, gameParams]
  );

  return (
    <section className={styles.window__inner}>
      <div className={styles.board__outer}>
        <Controls
          startGame={onStart}
          inProgress={gameInProgress}
          face={face}
          flags={flags}
        />
        <section className={styles.board__inner}>
          {boardGrid ? (
            <SquaresWrapper
              boardGrid={boardGrid}
              handleSquareClick={handleSquareClick}
              setFace={setFace}
              gameInProgress={gameInProgress}
            />
          ) : null}
        </section>
      </div>
    </section>
  );
};

export default Board;
