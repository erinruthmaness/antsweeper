import Square from "../Square/Square";
import styles from "./RowWrapper.module.css";

const RowWrapper = (props) => {
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

export default RowWrapper;
