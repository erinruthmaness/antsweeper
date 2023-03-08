import { faces } from "imgs/icons";

import { isProd } from "utils/logic/helpers";

const boardReducer = (state, action) => {
  const boardState = { ...state };

  switch (action.type) {
    case "SET_ANTS":
      if (!isProd) {
        console.log("BOARD REDUCER set ants");
      }
      return {
        ...boardState,
        board: action.payload.boardWithAnts,
        face: faces.smiling,
        flags: action.payload.flags,
      };
    case "CLEAR_BOARD":
      if (!isProd) {
        console.log("BOARD REDUCER clear board");
      }
      return { ...boardState, board: [] };
    case "NEW_BOARD":
      if (!isProd) {
        console.log("BOARD REDUCER new board");
      }
      return {
        ...boardState,
        board: action.payload.board,
        face: faces.smiling,
        flags: action.payload.flags,
      };
    case "UPDATE_BOARD":
      if (!isProd) {
        console.log("BOARD REDUCER update board");
      }
      return {
        ...boardState,
        board: action.payload.board,
        face: action.payload.face,
        flags: action.payload.flags,
      };
    case "SET_FACE":
      if (!isProd) {
        console.log("BOARD REDUCER set face");
      }
      return {
        ...boardState,
        face: action.payload.face,
      };
    default:
      return { ...state };
  }
};

export default boardReducer;
