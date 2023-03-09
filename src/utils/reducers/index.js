import { default as board } from "./boardReducer";
import { moveReducer as move } from "./moveReducer";
import { default as round } from "./roundReducer";

export const reducers = {
  board,
  move,
  round,
};
