import { useContext, useState, useEffect } from "react";
import { paramsContext, boardContext, roundContext } from "utils/store";
import { GAME_STATUS } from "utils/strings";

const useGameContext = () => {
  const paramsCtx = useContext(paramsContext);
  const roundCtx = useContext(roundContext);
  const boardCtx = useContext(boardContext);

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.WAITING);

  if (!boardCtx) {
    throw new Error("Cannot use outside of BoardCtxProvider.");
  }

  useEffect(() => {
    if (!roundCtx.started && roundCtx.ready) {
      setGameStatus(GAME_STATUS.READY);
    }
    if (roundCtx.started && roundCtx.ready) {
      setGameStatus(GAME_STATUS.IN_PROGRESS);
    }
    if (roundCtx.started && !roundCtx.ready) {
      setGameStatus(GAME_STATUS.OVER);
    }
  }, [roundCtx.ready, roundCtx.started, setGameStatus]);

  return {
    paramsCtx,
    boardCtx,
    roundCtx,
    gameStatus,
  };
};

export default useGameContext;
