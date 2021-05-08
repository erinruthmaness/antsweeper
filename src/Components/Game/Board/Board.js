import { useState, useCallback } from "react";

import Controls from "../Controls/Controls";
import SquaresWrapper from "../SquaresWrapper/SquaresWrapper";

import { faces } from "../utils/icons";
import { boardBuilder } from "../utils/create";
import { boardHandler } from "../utils/read";

import styles from "./Board.module.css";

let gameParams = {
  rows: 8,
  cols: 8,
  ants: 10,
};

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [face, setFace] = useState(faces.sleeping);

  const onStart = () => {
    setBoardGrid([]);
    setBoardGrid(boardBuilder(gameParams));
    setGameInProgress(true);
    setFace(faces.smiling);
  };

  const handleSquareClick = useCallback(
    (colIndex, rowIndex, whichClick) => {
      let updateGrid = [...boardGrid];
      let clickedSquare = boardGrid[colIndex][rowIndex];
      console.log("handling a " + whichClick + " click for:");
      console.log(clickedSquare);
      let updateAction = boardHandler.routeClick(clickedSquare, whichClick);
      updateGrid[colIndex][rowIndex] = updateAction.square;
      setBoardGrid(updateGrid);
      setFace(updateAction.face);
      setGameInProgress(updateAction.continue);
    },
    [boardGrid]
  );

  return (
    <section className={styles.window__inner}>
      <div className={styles.board__outer}>
        <Controls startGame={onStart} inProgress={gameInProgress} face={face} />
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
