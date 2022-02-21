import { useCallback, useContext, useEffect } from "react";

import paramsContext from "utils/store/paramsContext";
import roundContext from "utils/store/roundContext";
import boardContext from "utils/store/boardContext";

import Controls from "../Controls";
import RowWrapper from "./RowWrapper";

import styles from "./Board.module.css";

const Board = () => {
    const paramCtx = useContext(paramsContext);
    const roundCtx = useContext(roundContext);
    const boardCtx = useContext(boardContext);

    const restartRound = useCallback(() => {
        boardCtx.reset();
    }, [boardCtx]);
    const handleSquareClick = useCallback(
        (moveTypeAndLocation) => {
            boardCtx.update(moveTypeAndLocation);
        },
        [boardCtx]
    );

    useEffect(() => {
        const didLevelChange = paramCtx.level !== boardCtx.level;
        const isBoardReady = !(!roundCtx.ready && !roundCtx.started && boardCtx.board.length > 0);

        if (didLevelChange || !isBoardReady) {
            restartRound();
        }
    }, [paramCtx.level, boardCtx.level, boardCtx.board, roundCtx, restartRound]);

    return (
        <article className={styles.gameWrapper}>
            <Controls
                startGame={restartRound}
                inProgress={roundCtx.ready}
                // face={boardCtx.face}
                flags={boardCtx.flags}
                firstClick={roundCtx.started}
            />
            <div className={styles.boardWrapper}>
                {boardCtx.board ? (
                    <RowWrapper
                        boardGrid={boardCtx.board}
                        handleSquareClick={handleSquareClick}
                        gameInProgress={roundCtx.ready}
                    />
                ) : null}
            </div>
        </article>
    );
};

export default Board;
