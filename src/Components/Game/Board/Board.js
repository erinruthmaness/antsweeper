import { useState, useCallback } from "react";

import Controls from "../Controls/Controls";
import SquaresWrapper from "../SquaresWrapper/SquaresWrapper";

import { faces } from "../utils/icons";
import { boardBuilder } from "../utils/create";
import { boardHandler } from "../utils/read";
// import { uncoverZeros } from "../utils/update";
import { uncoverNeighbors } from "../utils/update";

import styles from "./Board.module.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameParams, setGameParams] = useState({
    rows: 8,
    cols: 8,
    ants: 10,
  });
  const [face, setFace] = useState(faces.sleeping);
  const [flags, setFlags] = useState(0);

  const onStart = () => {
    setBoardGrid([]);
    setBoardGrid(boardBuilder(gameParams));
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
      if (updateAction.square.nearbyAnts === 0) {
        // updateGrid = uncoverZeros.start(rowIndex, colIndex, updateGrid);
        updateGrid = uncoverNeighbors(updateAction.square, updateGrid);
      }
      setBoardGrid(updateGrid);
      setFace(updateAction.face);
      setFlags(updateAction.flags);
      setGameInProgress(updateAction.continue);
    },
    [boardGrid, flags]
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
