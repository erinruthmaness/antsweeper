import { useState } from "react";

import Square from './Square/Square';
// import styles from './Board.module.css';

const Board = () => {
  const [boardGrid, setBoardGrid] = useState([]);

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
    buildBoard(10, 5, 0);
  };

  const handleSquareClick = (colIndex, rowIndex) => {
      let updateGrid = boardGrid
      updateGrid[colIndex][rowIndex].clicked = true
    setBoardGrid(updateGrid)
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <h1>Antsweeper Controls go here</h1>
          </th>
          <th>
            <button onClick={handleStart}>Start</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {boardGrid
          ? boardGrid.map((row, index) => (
              <tr key={`row-${index + 1}`}>
                {row.map((square) => (
                  <Square
                    clicked={square.clicked}
                    id={square.id}
                    key={square.key}
                    column={square.col}
                    row={square.row}
                    onClick={handleSquareClick}
                  />
                ))}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Board;
