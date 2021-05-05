import { useState } from "react";

import Controls from "../Controls/Controls";
import Square from "../Square/Square";

import { faces } from "../utils/icons";
import { assignAnts } from "../utils/build";
import { leftClick, rightClick } from "../utils/click";

import styles from "./Board.module.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [face, setFace] = useState(faces.sleeping);

  const buildBoard = (cols, rows, ants) => {
    setBoardGrid(assignAnts(cols, rows, ants));
  };

  const onStart = () => {
    setBoardGrid([]);
    buildBoard(8, 8, 10);
    setGameInProgress(true);
    setFace(faces.smiling);
  };

  const handleSquareClick = (colIndex, rowIndex, whichClick) => {
    let updateGrid = boardGrid;
    let clickedSquare = updateGrid[colIndex][rowIndex];
    console.log("handling a " + whichClick + " click for:");
    console.log(clickedSquare);
    if (whichClick === "left") {
      let leftResult = leftClick(clickedSquare);
      clickedSquare = leftResult.square;
      if (!leftResult.square.ant) {
        setFace(leftResult.face);
      } else {
        setFace(faces.exploded);
        setGameInProgress(false);
      }
    } else if (whichClick === "right") {
      let rightResult = rightClick(clickedSquare);
      clickedSquare = rightResult.square;
      setFace(rightResult.face);
    }
    updateGrid[colIndex][rowIndex] = clickedSquare;
    setBoardGrid(updateGrid);
  };

  return (
    <section className={styles.window__inner}>
      <div className={styles.board__outer}>
        <Controls startGame={onStart} inProgress={gameInProgress} face={face} />
        <section className={styles.board__inner}>
          {boardGrid
            ? boardGrid.map((row, index) => (
                <div className={styles.board_row} key={`row-${index}`}>
                  {row.map((square) => (
                    <Square
                      key={square.key}
                      id={square.key}
                      sq={square}
                      onClick={handleSquareClick}
                      changeFace={setFace}
                      gameOver={!gameInProgress}
                    />
                  ))}
                </div>
              ))
            : null}
        </section>
      </div>
    </section>
  );
};

export default Board;
