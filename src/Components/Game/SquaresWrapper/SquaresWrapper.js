import Square from "../Square/Square";
import styles from "./SquaresWrapper.module.css";

const SquaresWrapper = (props) => {
  return props.boardGrid.map((row, index) => (
    <div className={styles.board_row} key={`row-${index}`}>
      {row.map((square) => (
        <Square
          key={square.key}
          id={square.key}
          sq={square}
          onClick={props.handleSquareClick}
          changeFace={props.setFace}
          gameOver={!props.gameInProgress}
        />
      ))}
    </div>
  ));
};

export default SquaresWrapper;
