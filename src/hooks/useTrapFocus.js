import { useRef, useEffect, useState, useCallback } from "react";

/*==================================================/
/ code adapted from Colete Wilson's codepen:        /
/ https://codepen.io/colette-wilson/pen/NWpBPEy     /
/==================================================*/

const useTrapFocus = () => {
	//use the ref to identify the element that will receive focus
	const ref = useRef();
	//dynamically populated on render
	const [focusableElements, setFocusableElements] = useState([]);
	const [activeIndex, setActiveIndex] = useState(-1);

	//manually direct tab to elements within ref area
	const next = useCallback(() => {
		let i = activeIndex;
		activeIndex + 1 === focusableElements.length ? (i = 0) : (i += 1);
		focusableElements[i].focus();
		setActiveIndex(i);
	}, [focusableElements, activeIndex]);

	//manually direct shift+tab to elements within ref area
	const previous = useCallback(() => {
		let i = activeIndex;
		activeIndex - 1 < 0 ? (i = focusableElements.length - 1) : (i -= 1);
		focusableElements[i].focus();
		setActiveIndex(i);
	}, [focusableElements, activeIndex]);

	useEffect(() => {
		if (ref.current) {
			// Select all focusable elements within ref (including ref)
			setFocusableElements([
				ref.current,
				...ref.current.querySelectorAll(
					"a, button, textarea, input, select, .focusable"
				),
			]);
		}
	}, [ref]);
	return { ref, next, previous };
};

export default useTrapFocus;
