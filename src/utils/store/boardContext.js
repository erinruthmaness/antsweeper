import React, { useReducer, useContext, useCallback } from "react";
import { paramsContext, roundContext } from ".";
import { initialState } from "./initialState";
import { reducers } from "utils/reducers";

import { buildBoard } from "utils/logic/board/createBoard";
import { readMove } from "utils/logic/move/readMove";

// for IDE completion
const defaultContext = {
  ...initialState.board,
  setFace: (newFace) => {},
  reset: () => {},
  clear: () => {},
  update: (y, x, clickType) => {},
};
const boardContext = React.createContext(defaultContext);

const BoardCtxProvider = ({ children }) => {
  const paramCtx = useContext(paramsContext);
  const roundCtx = useContext(roundContext);
  const [boardState, dispatchBoard] = useReducer(reducers.board, initialState.board);

  const setFace = (newFace) => dispatchBoard({ type: "SET_FACE", payload: { face: newFace } });
  const clear = useCallback(() => dispatchBoard({ type: "CLEAR_BOARD" }), []);
  const reset = useCallback(() => {
    clear();
    dispatchBoard({
      type: "NEW_BOARD",
      payload: {
        board: buildBoard(paramCtx.rows, paramCtx.cols),
        flags: paramCtx.ants,
      },
    });
    roundCtx.set.ready();
  }, [paramCtx, roundCtx.set, clear]);
  const update = useCallback(
    (moveTypeAndLocation) => {
      const { boardPayload, roundAction } = readMove(
        { ...moveTypeAndLocation },
        boardState,
        roundCtx
      );

      dispatchBoard({ type: "UPDATE_BOARD", payload: boardPayload });
      if (roundAction.type) {
        roundCtx.dispatch(roundAction);
      }
    },
    [boardState, roundCtx]
  );

  return (
    <boardContext.Provider value={{ ...boardState, setFace, reset, clear, update }}>
      {children}
    </boardContext.Provider>
  );
};

const useGameContext = () => {
  const boardCtx = React.useContext(boardContext);
  const roundCtx = React.useContext(roundContext);
  if (!boardCtx) {
    throw new Error("Cannot use 'useBoard' outside of a BoardCtxProvider.");
  }

  return { boardCtx, roundCtx };
};

export { BoardCtxProvider, useGameContext };
