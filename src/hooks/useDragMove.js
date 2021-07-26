import { useState } from "react";

const useDragMove = () => {
	const [translate, setTranslate] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const grab = () => {
		console.log("dragmove hook grabbing");
		setIsDragging(true);
	};
	const drag = (e) => {
		if (isDragging) {
			console.log("dragmove hook is dragging");
			const minMargin = 20;
			if (
				e.clientY > minMargin &&
				e.clientX > minMargin &&
				e.clientX < e.view.innerWidth - minMargin
			) {
				setTranslate((prevState) => {
					return {
						x: prevState.x + e.movementX,
						y: prevState.y + e.movementY,
					};
				});
			} else {
				setTranslate({
					x: 0,
					y: 0,
				});
				drop();
			}
		}
	};
	const drop = () => {
		console.log("dragmove hook dropping");
		setIsDragging(false);
	};

	return {
		isDragging,
		grab,
		drag,
		drop,
		translate,
	};
};

export default useDragMove;
