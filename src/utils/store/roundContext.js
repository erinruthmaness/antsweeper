import React, { useReducer } from "react";
import roundReducer from "../reducers/roundReducer";

//for IDE completion
const defaultContext = {
  ready: null,
  started: null,
  set: {
    ready: () => {},
    start: () => {},
    lost: () => {},
    won: () => {},
    reset: () => {},
  },
};
const roundContext = React.createContext(defaultContext);
export default roundContext;

export const RoundCtxProvider = (props) => {
  const initialState = {
    ready: false,
    started: false,
  };
  const [roundState, dispatchRound] = useReducer(roundReducer, initialState);

  const set = {
    ready: () => {
      dispatchRound({ type: "BOARD_SET" });
    },
    start: () => {
      dispatchRound({ type: "START_ROUND" });
    },
    lost: () => {
      dispatchRound({ type: "LOST" });
    },
    won: () => {
      dispatchRound({ type: "WON" });
    },
    reset: () => {
      dispatchRound({ type: "RESET", payload: { ...initialState } });
    },
  };

  return (
    <roundContext.Provider value={{ ...roundState, set: set }}>
      {props.children}
    </roundContext.Provider>
  );
};
