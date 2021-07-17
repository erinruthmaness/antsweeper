import { faces } from "../../imgs/icons";

const boardReducer = (state, action) => {
  switch (action.type) {
    case "RESET_BOARD":
        console.log("BOARD REDUCER reset board")
      return { ...action.payload };
    case "CLEAR_BOARD":
        console.log("BOARD REDUCER clear board")
      return { ...state, board: [] };
    case "UNCOVER_BOARD":
        console.log("BOARD REDUCER uncover board")
      return {
        ...state,
        ...action.payload,
        face: faces.smiling,
      };
    case "SET_ANTS":
        console.log("BOARD REDUCER set ants")
      return {
        ...state,
        ...action.payload,
        face: faces.smiling,
      };
    case "UPDATE_BOARD":
        console.log("BOARD REDUCER update board")
      return {
        ...state,
        ...action.payload,
      };
    case "SET_FACE":
        console.log("BOARD REDUCER set face")
      return {
        ...state,
        face: action.payload,
      };
    default:
      return { ...state };
  }
};

export default boardReducer;
