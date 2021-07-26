import React, { useState } from "react";
import { RoundCtxProvider } from "./roundContext";
import { ParamCtxProvider } from "./paramsContext";
import { UserCtxProvider } from "./userContext";
import useDragMove from "../../hooks/useDragMove";

//for IDE completion
const defaultContext = {
	overlay: {
		display: null,
		modalContent: null,
		hide: () => {},
		show: () => {},
		modal: (content) => {},
	},
	dragMove: {
		translate: {
			x: null,
			y: null,
		},
		isDragging: null,
		grab: () => {},
		drag: (e) => {},
		drop: () => {},
	},
	minimize: {
		isMinimized: null,
		down: () => {},
		up: () => {},
	},
};
const windowContext = React.createContext(defaultContext);
export default windowContext;

export const WindowCtxProvider = (props) => {
	//------overlay------
	const [overlayState, setOverlayState] = useState(false);
	const [overlayContent, setOverlayContent] = useState(null);
	const hide = () => {
		if (overlayState) {
			setOverlayState(false);
			console.log("WINDOW CONTEXT hiding overlay");
		}
		if (overlayContent) {
			setOverlayContent(null);
		}
	};
	const show = () => {
		if (!overlayState) {
			setOverlayState(true);
			console.log("WINDOW CONTEXT showing overlay");
		}
	};
	const modal = (title, content) => {
		setOverlayContent({ title, content });
		if (!overlayState) {
			show();
		}
		console.log("WINDOW CONTEXT showing modal");
	};
	//------minimize------
	const [isMinimized, setIsMinimized] = useState(false);
	const down = () => {
		setIsMinimized(true);
	};
	const up = () => {
		setIsMinimized(false);
	};
	//------dragMove------
	const dragMove = useDragMove();

	return (
		<windowContext.Provider
			value={{
				overlay: {
					display: overlayState,
					modalContent: overlayContent,
					hide,
					show,
					modal,
				},
				dragMove,
				minimize: {
					isMinimized,
					down,
					up,
				},
			}}
		>
			<ParamCtxProvider>
				<RoundCtxProvider>
					<UserCtxProvider>{props.children}</UserCtxProvider>
				</RoundCtxProvider>
			</ParamCtxProvider>
		</windowContext.Provider>
	);
};
