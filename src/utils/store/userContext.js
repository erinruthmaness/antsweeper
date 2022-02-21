import React, { useCallback, useState/*, useContext , useEffect*/ } from "react";
// import roundContext from "./roundContext";
// import boardContext from "./boardContext";

//for IDE completion
const defaultContext = {
    click: {
        last: null,
        current: null,
        set: (e) => {},
    },
    key: {
        last: null,
        current: null,
        set: (e) => {},
    },
};
const userContext = React.createContext(defaultContext);
export default userContext;

export const UserCtxProvider = (props) => {
    // const roundCtx = useContext(roundContext);
    // const boardCtx = useContext(boardContext);

    const [lastClick, setLastClick] = useState({ targetID: null });
    const [currentClick, setCurrentClick] = useState({ targetID: null });
    const [lastKey, setLastKey] = useState({ targetID: null });
    const [currentKey, setCurrentKey] = useState({ targetID: null });

    const handleClick = useCallback(
        (e) => {
            const { type, target } = e;
            const which = e.nativeEvent.which === 1 ? "left" : "right";
            setLastClick(currentClick);
            setCurrentClick({
                which,
                type,
                target,
                targetID: target["id"],
                event: e,
            });
            console.log(`clicked ${target["id"] || "something"}`);
        },
        [currentClick]
    );

    /*useEffect(() => {
        if (currentClick.targetID !== lastClick.targetID) {
            setLastClick(currentClick);
            const clickKey = currentClick.targetID.split("-");
            if (currentClick.targetID === "face-button") {
                boardCtx.reset();
            }
            if (clickKey[0] === "cell") {
                clickKey[1].charAt(-1);
                boardCtx.update(clickKey[2].charAt(-1), clickKey[1].charAt(-1), currentClick.which);
            }
        }
    }, [currentClick, lastClick, boardCtx]);*/

    const handleKeyPress = useCallback(
        (e) => {
            console.log(e);
            const { key, keyCode, target } = e;
            setLastKey(currentKey);
            setCurrentKey({
                key,
                keyCode,
                target,
                targetID: target["id"],
                event: e,
            });
            console.log(`pressed ${key} on ${target["id"] || "something"}`);
        },
        [currentKey]
    );

    return (
        <userContext.Provider
            value={{
                click: {
                    last: lastClick,
                    current: currentClick,
                    set: handleClick,
                },
                key: {
                    last: lastKey,
                    current: currentKey,
                    set: handleKeyPress,
                },
            }}>
            {props.children}
        </userContext.Provider>
    );
};
