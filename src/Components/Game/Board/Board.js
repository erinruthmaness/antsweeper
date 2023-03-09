import { useCallback, useContext, useEffect } from "react";

import { paramsContext, useGameContext } from "utils/store";

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
    // FIX LATER - without "didLevelChange" the squares don't reset until a new game is launched
    // but "didLevelChange" was checking for the level name copied to board context, which wasn't getting updated
    // and that caused an infinite loop since "didLevelChange" was always "true" after level change
    // const didLevelChange = paramCtx.level !== boardCtx.level;
    const isBoardReady = !(!roundCtx.ready && !roundCtx.started && boardCtx.board.length > 0);

    if (/*didLevelChange ||*/ !isBoardReady) {
      restartRound();
    }
  }, [
    /*paramCtx.level,*/ /*boardCtx.level,*/ boardCtx.board.length,
    roundCtx.ready,
    roundCtx.started,
    restartRound,
  ]);

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
