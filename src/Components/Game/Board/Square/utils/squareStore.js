//declared outside of the component in case it might rerender & reset to default
//don't need it in state because state triggers a UI change (rerender)
export const current = {
    wasClicked: false,
    clickType: "left",
    wasTouched: false,
    touchLength: 0,
};

export const reset = () => {
    current.wasClicked = false;
    current.clickType = "left";
    current.wasTouched = false;
    current.touchLength = 0;
};

export const update = (leftOrRight, onClickFunction, sqX, sqY) => {
    //reset defaults for this square, but not wasClicked/wasTouched
    //because that should stay the same across the game
    current.clickType = "left";
    current.touchLength = 0;
    onClickFunction({
        y: sqY,
        x: sqX,
        clickType: leftOrRight.toUpperCase() + "_CLICK",
    });
};
