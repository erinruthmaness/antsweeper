import { useGameContext } from "utils/hooks";

import Controls from "../Controls";
import Square from "../Square";

import styles from "./Board.module.css";

const Board = () => {
  const { paramsCtx, boardCtx, roundCtx } = useGameContext();

  return (
    <article className={styles.gameWrapper}>
      <Controls
        startGame={boardCtx.reset}
        inProgress={roundCtx.ready}
        flags={boardCtx.flags}
        maxFlags={paramsCtx.ants}
        firstClick={roundCtx.started}
      />
      <div
        id="game-board"
        role="grid"
        aria-colcount={paramsCtx.cols}
        aria-rowcount={paramsCtx.rows}
        className={styles.boardWrapper}>
        {boardCtx.board
          ? boardCtx.board.map((row, index) => (
              <div className={styles.board_row} key={`row-${index}`} role="row">
                {row.map((square) => (
                  <Square
                    key={square.key}
                    sq={square}
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
