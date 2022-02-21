import React, { useReducer, useContext, useCallback } from "react";
import paramsContext from "utils/store/paramsContext";
import roundContext from "utils/store/roundContext";
import boardReducer from "utils/reducers/boardReducer";
import { defaultBoardState, default as getInitialBoard } from "utils/store/initialState/board";

import { buildBoard } from "utils/logic/board/createBoard";
import { readMove } from "utils/logic/move/readMove";

//for IDE completion
const defaultContext = {
    ...defaultBoardState,
    setFace: (newFace) => {},
    reset: () => {},
    clear: () => {},
    update: (y, x, clickType) => {},
};
const boardContext = React.createContext(defaultContext);
export default boardContext;

export const BoardCtxProvider = (props) => {
    const paramCtx = useContext(paramsContext);
    const roundCtx = useContext(roundContext);
    const [boardState, dispatchBoard] = useReducer(boardReducer, getInitialBoard(paramCtx));

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
        <boardContext.Provider
            value={{
                ...boardState,
                setFace,
                reset,
                clear,
                update,
            }}>
            {props.children}
        </boardContext.Provider>
    );
};
