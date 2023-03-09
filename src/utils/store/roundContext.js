import React, { useReducer, useContext } from "react";
import { paramsContext } from ".";
import { reducers } from "utils/reducers";
import { initialState } from "./initialState";
import useLocalStorage from "utils/hooks/useLocalStorage";

//for IDE completion
const defaultContext = {
  ...initialState.round,
  set: {
    ready: () => {},
    start: () => {},
    lost: () => {},
    won: () => {},
    reset: () => {},
  },
  dispatch: (action) => {},
  saveUserStats: () => {},
};
const roundContext = React.createContext(defaultContext);
export default roundContext;

export const RoundCtxProvider = ({ isTestMode = false, children }) => {
  const [roundState, dispatchRound] = useReducer(reducers.round, {
    ...initialState.round,
    test: isTestMode,
  });
  const [userStats, saveUserStats] = useLocalStorage(roundState.userStats);
  const paramCtx = useContext(paramsContext);

  const set = {
    ready: (payload) => {
      dispatchRound({ type: "BOARD_SET", payload });
    },
    start: (payload) => {
      dispatchRound({ type: "START_ROUND", payload });
    },
    lost: (payload) => {
      dispatchRound({ type: "LOST", level: paramCtx.level, payload });
    },
    won: (payload) => {
      dispatchRound({ type: "WON", level: paramCtx.level, payload });
    },
    reset: () => {
      dispatchRound({ type: "RESET", payload: { ...initialState.round } });
    },
  };

  const dispatch = (action) => {
    set[action.type](action.payload);
  };

  return (
    <roundContext.Provider value={{ ...roundState, set, dispatch, userStats, saveUserStats }}>
      {children}
    </roundContext.Provider>
  );
};
