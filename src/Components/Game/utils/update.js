import Square from "../Square/Square";
import styles from '../Board/Board.module.css';

export const updateBoard = (boardGrid, handleSquareClick, setFace, gameInProgress) => {
  return boardGrid.map((row, index) => (
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
  ));
};
