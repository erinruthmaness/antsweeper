import React, { useReducer } from "react";
import roundReducer from "utils/reducers/roundReducer";
import defaultRoundState from "utils/store/initialState/round";

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
};
const roundContext = React.createContext(defaultContext);
export default roundContext;

export const RoundCtxProvider = (props) => {
    const [roundState, dispatchRound] = useReducer(roundReducer, defaultRoundState);

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
            dispatchRound({ type: "RESET", payload: { ...defaultRoundState } });
        },
    };

    const dispatch = (action) => dispatchRound(action);

    return (
        <roundContext.Provider value={{ ...roundState, set, dispatch }}>
            {props.children}
        </roundContext.Provider>
    );
};
