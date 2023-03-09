import PropTypes from "prop-types";
import { useBoardContext } from "utils/store/boardContext";
import styles from "./FaceButton.module.css";

const FaceButton = (props) => {
    const boardCtx = useBoardContext();

    return (
        <button
            id="face-button"
            aria-label="startGame"
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
