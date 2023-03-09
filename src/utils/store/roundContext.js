import React, { useReducer, useContext } from "react";
import roundReducer from "utils/reducers/roundReducer";
import defaultRoundState from "utils/store/initialState/round";
import useLocalStorage from "hooks/useLocalStorage";
import paramContext from "./paramsContext";

//for IDE completion
const defaultContext = {
    ...defaultRoundState,
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

export const RoundCtxProvider = (props) => {
    const [roundState, dispatchRound] = useReducer(roundReducer, defaultRoundState);
    const [userStats, saveUserStats] = useLocalStorage(roundState.userStats);
    const paramCtx = useContext(paramContext);

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
            dispatchRound({ type: "RESET", payload: { ...defaultRoundState } });
        },
    };

    const dispatch = (action) => {
        set[action.type](action.payload);
    };

    return (
        <roundContext.Provider value={{ ...roundState, set, dispatch, userStats, saveUserStats }}>
            {props.children}
        </roundContext.Provider>
    );
};
