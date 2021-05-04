import { useState } from "react";

import Controls from "../Controls/Controls";
import Square from "../Square/Square";

import styles from "./Board.module.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [face, setFace] = useState(["0xD83D", "0xDE34"]); //sleeping

  const buildBoard = (cols, rows /*, ants*/) => {
    let tempArray = Array.from(Array(cols), (col, colIndex) => {
      return Array.from(Array(rows), (row, rowIndex) =>
        buildSquare(colIndex, rowIndex)
      );
    });
    console.log(tempArray);
    setBoardGrid(tempArray);
  };

  const buildSquare = (col, row) => {
    return {
      key: "cell-" + col + "-" + row,
      col: col,
      row: row,
      ant: false,
      clicked: false,
      display: "?",
      flagged: false,
    };
  };

  const onStart = () => {
    setBoardGrid([]);
    buildBoard(12, 12, 0);
    setGameInProgress(true);
    setFace(["0xD83D", "0xDE0A"]); //smiling
  };

  const handleSquareClick = (colIndex, rowIndex, whichClick) => {
    let updateGrid = boardGrid;
    let clickedSquare = updateGrid[colIndex][rowIndex];
    if (whichClick === "left") {
      if (clickedSquare.flagged) {
        return;
      } else {
        clickedSquare.clicked = true;
        if (clickedSquare.ant) {
          console.log("oh nooo");
        } else {
          clickedSquare.display = ":o";

          setFace(["0xD83D", "0xDE0A"]); //smiling
        }
      }
    } else {
      if (clickedSquare.flagged) {
        clickedSquare.display = "?";
        clickedSquare.flagged = false;
        setFace(["0xD83D", "0xDE0A"]); //smiling
      } else {
        clickedSquare.display = ["0xD83D", "0xDEA9"];
        clickedSquare.flagged = true;
        setFace(["0xD83D", "0xDE0A"]); //smiling
      }
    }
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
                      clicked={square.clicked}
                      id={square.key}
                      column={square.col}
                      row={square.row}
                      show={square.display}
                      flagged={square.flagged}
                      onClick={handleSquareClick}
                      changeFace={setFace}
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
