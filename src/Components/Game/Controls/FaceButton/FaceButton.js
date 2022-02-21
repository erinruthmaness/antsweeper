import { useContext } from "react";
import PropTypes from "prop-types";
import boardContext from "utils/store/boardContext";
import styles from "./FaceButton.module.css";

const FaceButton = (props) => {
    const boardCtx = useContext(boardContext);

    return (
        <button id="face-button" onClick={props.onClick} className={styles.faceButton}>
            {String.fromCharCode(boardCtx.face[0], boardCtx.face[1])}
        </button>
    );
};

FaceButton.propTypes = {
    onClick: PropTypes.func,
};

export default FaceButton;
