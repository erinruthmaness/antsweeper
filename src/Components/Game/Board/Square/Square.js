import { useRef, useContext } from "react";
import boardContext from "utils/store/boardContext";
import PropTypes from "prop-types";
import { assessDigit } from "utils/logic/helpers";
import { getSqResponse, sqState } from "./utils";
import styles from "./Square.module.css";

const Square = (props) => {
    const countRef = useRef();
    const boardCtx = useContext(boardContext);

    const parseClick = (event, clickDirection) => {
        if (props.gameOver) {
            sqState.reset();
            return;
        }

        const isFlaggedSquare = props.sq.flagged && event.nativeEvent.which === 1;
        const doNothing = sqState.current.wasTouched || props.sq.revealed || isFlaggedSquare;

        if (doNothing) {
            return;
        } else if (clickDirection === "down") {
            const { which, face } = getSqResponse.mouseDown(event.nativeEvent.which, props);
            boardCtx.setFace(face);

            sqState.current.wasClicked = true;
            sqState.current.clickType = which;
        } else if (clickDirection === "up") {
            if (!sqState.current.wasTouched) {
                sqState.update(sqState.current.clickType, props.onClick, props.sq.x, props.sq.y);
            }
        }
    };

    const parseTouch = (touchEvent) => {
        if (props.gameOver) {
            sqState.reset();

            return;
        } else if (sqState.current.wasClicked || props.sq.revealed) {
            return;
        } else if (touchEvent === "start") {
            sqState.current.wasTouched = true;
            boardCtx.setFace(getSqResponse.touchStart(props.sq.flagged).face);
            countRef.current = setInterval(() => {
                sqState.current.touchLength++;
            }, 800);
        } else if (touchEvent === "end") {
            //stops timer
            clearInterval(countRef.current);

            const { which, face } = getSqResponse.touchEnd(sqState.current.touchLength);

            if (props.sq.flagged && which === "left") {
                boardCtx.setFace(face);

                return;
            } else {
                sqState.update(sqState.current.clickType, props.onClick, props.sq.x, props.sq.y);
            }
        }
    };

    return (
        <button
            id={props.sq.id}
            className={`
        ${styles.square}
        ${props.sq.revealed && styles["square--clicked"]} 
        ${styles[assessDigit("nearbys", props.sq.nearbyAnts)]}
        ${props.sq.revealed && props.sq.ant && !props.sq.unclickedAnt ? styles.firstAnt : null} 
      `}
            onMouseDown={(e) => parseClick(e, "down")}
            onMouseUp={!sqState.current.wasTouched ? (e) => parseClick(e, "up") : undefined}
            onTouchStart={() => parseTouch("start")}
            onTouchEnd={!sqState.current.wasClicked ? () => parseTouch("end") : undefined}
            onContextMenu={(e) => e.preventDefault()}>
            {Array.isArray(props.sq.display)
                ? String.fromCharCode(props.sq.display[0], props.sq.display[1])
                : props.sq.display}
        </button>
    );
};

Square.propTypes = {
    changeFace: PropTypes.func,
    gameOver: PropTypes.bool,
    id: PropTypes.string,
    onClick: PropTypes.func,
    sq: PropTypes.shape({
        ant: PropTypes.bool,
        display: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        flagged: PropTypes.bool,
        key: PropTypes.string,
        nearbyAnts: PropTypes.number,
        neighbors: PropTypes.arrayOf(PropTypes.object),
        revealed: PropTypes.bool,
        unclickedAnt: PropTypes.bool,
        x: PropTypes.number,
        y: PropTypes.number,
    }),
};

export default Square;
