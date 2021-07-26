import { useCallback, /*useRef,*/ useState } from "react";

const useGlobalListener = (eventName, exceptionIdList = []) => {
	const [heardEvent, setHeardEvent] = useState(false);

	const globalListener = useCallback(
		(e) => {
			let heardEvent = false;
			if (exceptionIdList && e.target.id !== "") {
				if (exceptionIdList.includes(e.target.id)) {
				} else {
					setHeardEvent(true);
				}
			} else {
				setHeardEvent(true);
			}
			return heardEvent;
		},
		[exceptionIdList]
	);
	return {
		eventFired: heardEvent,
		add: () => {
			document.addEventListener(eventName, globalListener);
		},
		remove: () => {
			document.removeEventListener(eventName, globalListener);
		},
		clear: () => {
			setHeardEvent(false);
		},
	};
};

export default useGlobalListener;
