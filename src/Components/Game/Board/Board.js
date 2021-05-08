import { useEffect, useState, useCallback } from "react";

import Controls from "../Controls/Controls";

import { faces } from "../utils/icons";
import { assignAnts } from "../utils/create";
import { boardHandler } from "../utils/read";
import { updateBoard } from "../utils/update";

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
    setBoardGrid(assignAnts(gameParams));
    setGameInProgress(true);
    setFace(faces.smiling);
  };

  const handleSquareClick = useCallback((colIndex, rowIndex, whichClick) => {
    let updateGrid = [...boardGrid];
    let clickedSquare = boardGrid[colIndex][rowIndex];
    console.log("handling a " + whichClick + " click for:");
    console.log(clickedSquare);
    let updateAction = boardHandler.routeClick(clickedSquare, whichClick);
    updateGrid[colIndex][rowIndex] = updateAction.square;
    setBoardGrid(updateGrid);
    setFace(updateAction.face);
    setGameInProgress(updateAction.continue);
  }, [boardGrid]);

  useEffect(() => {
    updateBoard(boardGrid, handleSquareClick, setFace, gameInProgress);
  }, [boardGrid, handleSquareClick, gameInProgress]);

  return (
    <section className={styles.window__inner}>
      <div className={styles.board__outer}>
        <Controls startGame={onStart} inProgress={gameInProgress} face={face} />
        <section className={styles.board__inner}>
          {boardGrid
            ? updateBoard(boardGrid, handleSquareClick, setFace, gameInProgress)
            : null}
        </section>
      </div>
    </section>
  );
};

export default Board;
