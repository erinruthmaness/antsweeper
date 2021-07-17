const roundReducer = (state, action) => {
  switch (action.type) {
    case "BOARD_SET":
        console.log("ROUND REDUCER board set")
      return { ...state, ready: true, started: false };
    case "START_ROUND":
        console.log("ROUND REDUCER start round")
      return { ...state, started: true };
    case "WON":
    case "LOST":
        console.log("ROUND REDUCER won/lost")
      return { ...state, ready: false };
    case "RESET":
        console.log("ROUND REDUCER reset")
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export default roundReducer;
