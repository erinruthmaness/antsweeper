import { useRef, useState, useEffect } from "react";
import { useGameContext } from "utils/store/boardContext";
import PropTypes from "prop-types";
import { assessDigit } from "utils/logic/helpers";
import { getSqResponse, sqState } from "./utils";
import styles from "./Square.module.css";

const Square = ({ gameOver, sq }) => {
    const countRef = useRef();
    const { boardCtx, roundCtx } = useGameContext();

    const { revealed, flagged, ant, display, nearbyAnts } = sq;
    const [sqValue, setSqValue] = useState("unknown");

    const { test } = roundCtx;
    const testValue = ant ? "ant" : sq.id;

    useEffect(() => {
        if (flagged) {
            setSqValue("flagged");
        } else if (!revealed) {
            setSqValue("unknown");
        } else if (revealed && !ant) {
            ant
                ? setSqValue("ANT!")
                : setSqValue(display ? `${display} ants nearby` : "0 ants nearby");
        }
    }, [revealed, flagged, ant, display, setSqValue]);

    const preventUnnecessaryParse = () => {
        if (gameOver) {
            sqState.reset();
            return true;
        } else if (revealed) {
            return true;
        } else {
            return false;
        }
    };

    const parseClick = (event, clickDirection) => {
        const isFlaggedSquare = flagged && event.button === 1;

        if (preventUnnecessaryParse() || sqState.current.wasTouched || isFlaggedSquare) {
            return;
        }

        if (clickDirection === "down") {
            const { which, face } = getSqResponse.mouseDown(event.button, flagged);
            boardCtx.setFace(face);

            sqState.current.wasClicked = true;
            sqState.current.clickType = which;
        } else if (clickDirection === "up") {
            if (!sqState.current.wasTouched) {
                sqState.update(sqState.current.clickType, boardCtx.update, sq.x, sq.y);
            }
        }
    };

    const parseTouch = (touchEvent) => {
        if (preventUnnecessaryParse() || sqState.current.wasClicked) {
            return;
        }

        if (touchEvent === "start") {
            sqState.current.wasTouched = true;
            boardCtx.setFace(getSqResponse.touchStart(flagged).face);
            countRef.current = setInterval(() => {
                sqState.current.touchLength++;
            }, 800);
        } else if (touchEvent === "end") {
            //stops timer
            clearInterval(countRef.current);

            const { which, face } = getSqResponse.touchEnd(sqState.current.touchLength);

            if (flagged && which === "left") {
                boardCtx.setFace(face);

                return;
            } else {
                sqState.update(sqState.current.clickType, boardCtx.update, sq.x, sq.y);
            }
        }
    };

    return (
        <div
            role="gridcell"
            aria-colindex={sq.x + 1}
            aria-rowindex={sq.y + 1}
            className={styles.square__wrapper}>
            <button
                id={sq.key}
                aria-label={sq.key}
                aria-pressed={revealed}
                value={sqValue}
                data-testid={test ? testValue : null}
                className={getSquareClassNames(
                    styles,
                    revealed,
                    nearbyAnts,
                    revealed && ant && !sq.unclickedAnt
                )}
                onMouseDown={(e) => parseClick(e, "down")}
                onMouseUp={!sqState.current.wasTouched ? (e) => parseClick(e, "up") : undefined}
                onTouchStart={() => parseTouch("start")}
                onTouchEnd={!sqState.current.wasClicked ? () => parseTouch("end") : undefined}
                onContextMenu={(e) => e.preventDefault()}>
                {getSquareContents(display)}
            </button>
        </div>
    );
};

function getSquareClassNames(styles, revealed, nearbyAnts, isFirstRevealedAnt) {
    const classNames = [styles.square, styles[assessDigit("nearbys", nearbyAnts)]];

    if (revealed) {
        classNames.push(styles["square--clicked"]);
    }

    if (isFirstRevealedAnt) {
        classNames.push(styles.firstAnt);
    }

    return classNames.join(" ");
}

function getSquareContents(squarePropsDisplay) {
    return Array.isArray(squarePropsDisplay)
        ? String.fromCharCode(squarePropsDisplay[0], squarePropsDisplay[1])
        : squarePropsDisplay;
}

Square.propTypes = {
    gameOver: PropTypes.bool,
    id: PropTypes.string,
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
