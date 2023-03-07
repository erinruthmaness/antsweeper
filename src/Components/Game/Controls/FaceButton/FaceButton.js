import PropTypes from "prop-types";
import { useGameContext } from "utils/store/boardContext";
import styles from "./FaceButton.module.css";

const FaceButton = (props) => {
    const { boardCtx } = useGameContext();

    return (
        <button
            id="face-button"
            aria-label="start-game"
            aria-controls="game-board"
            onClick={props.onClick}
            className={styles.faceButton}>
            {String.fromCharCode(boardCtx.face[0], boardCtx.face[1])}
        </button>
    );
};

FaceButton.propTypes = {
    onClick: PropTypes.func,
};

export default FaceButton;
