import { faces } from "../logic/icons";

const boardReducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_BOARD":
            return { ...state, board: [] };
        case "UNCOVER_BOARD":
            return {
                ...state,
                ...action.payload,
                face: faces.smiling,
            };
        case "SET_ANTS":
            return {
                ...state,
                ...action.payload,
                face: faces.smiling,
            };
        case "UPDATE_BOARD":
            return {
                ...state,
                ...action.payload,
            };
        case "SET_FACE":
            return {
                ...state,
                face: action.payload,
            };
        default:
            return { ...state };
    }
};

export default boardReducer;