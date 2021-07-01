const roundReducer = (state, action) => {
    switch (action.type) {
        case "BOARD_SET":
            return { ...state, ready: true, started: false };
        case "START_ROUND":
            console.log("okay you started!");
            return { ...state, started: true };
        case "WON":
        case "LOST":
            return { ...state, ready: false };
        default:
            return { ...state };
    }
};

export default roundReducer;