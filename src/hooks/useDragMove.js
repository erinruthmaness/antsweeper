import { useState } from "react";

const useDragMove = () => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const grab = () => {
        setIsDragging(true);
    };
    const drag = (e) => {
        if (isDragging) {
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
