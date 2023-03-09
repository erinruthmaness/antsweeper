import PropTypes from "prop-types";
import Square from "Components/Game/Board/Square";
import styles from "./RowWrapper.module.css";

const RowWrapper = (props) => {
    return props.boardGrid.map((row, index) => (
        <div className={styles.board_row} key={`row-${index}`}>
            {row.map((square) => (
                <Square key={square.key} id={square.key} sq={square} onClick={props.handleSquareClick} changeFace={props.setFace} gameOver={!props.gameInProgress} />
            ))}
        </div>
    ));
};

RowWrapper.propTypes = {
  boardGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  gameInProgress: PropTypes.bool,
  handleSquareClick: PropTypes.func,
  setFace: PropTypes.func
};

export default RowWrapper;
