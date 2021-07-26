import React, { useCallback, /*useEffect,*/ useState } from "react";

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
	const [lastClick, setLastClick] = useState(null);
	const [currentClick, setCurrentClick] = useState(null);
	const [lastKey, setLastKey] = useState(null);
	const [currentKey, setCurrentKey] = useState(null);

	const handleClick = useCallback(
		(e) => {
			setLastClick(currentClick);
			setCurrentClick(e);
		},
		[currentClick]
	);

	const handleKeyPress = useCallback(
		(e) => {
			setLastKey(currentKey);
			setCurrentKey(e);
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
			}}
		>
			{props.children}
		</userContext.Provider>
	);
};
