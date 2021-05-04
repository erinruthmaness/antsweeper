import { useState } from "react";

import Square from "./Square/Square";

import styles from "./Board.module.css";

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);

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
    };
  };

  const handleStart = () => {
    setBoardGrid([]);
    buildBoard(10, 5, 0);
    setGameInProgress(true);
  };

  const handleSquareClick = (colIndex, rowIndex) => {
    let updateGrid = boardGrid;
    updateGrid[colIndex][rowIndex].clicked = true;
    setBoardGrid(updateGrid);
  };

  return (
    <main>
      <header className={styles.board_controls}>
        <h1>Antsweeper Controls go here</h1>
        {gameInProgress ? (
          <button onClick={handleStart}>Reset</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
      </header>
      <section className={styles.board}>
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
                    onClick={handleSquareClick}
                  />
                ))}
              </div>
            ))
          : null}
      </section>
    </main>
  );
};

export default Board;
