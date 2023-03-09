import { faces } from "imgs/icons";
import { initialLevelParams } from "./params";

export const initialBoardState = {
  board: [],
  antList: [],
  flags: initialLevelParams.ants,
  face: faces.sleeping,
};
