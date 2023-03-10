import React, { useReducer, useContext } from "react";
import { paramsContext } from ".";
import { reducers } from "utils/reducers";
import { initialState } from "./initialState";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { useTimer } from "utils/hooks";

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
  const paramCtx = useContext(paramsContext);
  const [roundState, dispatchRound] = useReducer(reducers.round, {
    ...initialState.round,
    test: isTestMode,
  });
  const [userStats, saveUserStats] = useLocalStorage(roundState.userStats);

  const roundTimer = useTimer();

  const set = {
    ready: (payload) => {
      roundTimer.clear();
      dispatchRound({ type: "BOARD_SET", payload });
    },
    start: (payload) => {
      roundTimer.start();
      dispatchRound({ type: "START_ROUND", payload });
    },
    lost: (payload) => {
      roundTimer.stop();
      dispatchRound({ type: "LOST", level: paramCtx.level, payload });
    },
    won: (payload) => {
      roundTimer.stop();
      dispatchRound({ type: "WON", level: paramCtx.level, payload });
    },
    reset: () => {
      roundTimer.clear();
      dispatchRound({ type: "RESET", payload: { ...initialState.round } });
    },
  };

  const dispatch = (action) => {
    set[action.type](action.payload);
  };

  return (
    <roundContext.Provider
      value={{
        ...roundState,
        time: roundTimer.count,
        set,
        dispatch,
        userStats,
        saveUserStats,
      }}>
      {children}
    </roundContext.Provider>
  );
};
