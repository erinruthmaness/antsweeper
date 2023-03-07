import { useCallback, useContext, useEffect } from "react";

import paramsContext from "utils/store/paramsContext";
import { useGameContext } from "utils/store/boardContext";

import Controls from "../Controls";
import Square from "../Square";

import styles from "./Board.module.css";

const Board = () => {
    const paramCtx = useContext(paramsContext);
    const { boardCtx, roundCtx } = useGameContext();

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
                flags={boardCtx.flags}
                maxFlags={paramCtx.ants}
                firstClick={roundCtx.started}
            />
            <div
                id="game-board"
                role="grid"
                aria-colcount={paramCtx.cols}
                aria-rowcount={paramCtx.rows}
                className={styles.boardWrapper}>
                {boardCtx.board
                    ? boardCtx.board.map((row, index) => (
                          <div className={styles.board_row} key={`row-${index}`} role="row">
                              {row.map((square) => (
                                  <Square
                                      key={square.key}
                                      sq={square}
                                      onClick={handleSquareClick}
                                      gameOver={!roundCtx.ready}
                                  />
                              ))}
                          </div>
                      ))
                    : null}
            </div>
        </article>
    );
};

export default Board;
