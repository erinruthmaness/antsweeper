import React, { useCallback, useState } from "react";

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
        },
        [currentClick]
    );

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
            // console.log(`pressed ${key} on ${target["id"] || "something"}`);
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
