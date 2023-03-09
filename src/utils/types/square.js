import { squares } from "imgs/icons";

const x = 0;
const y = 0;

const square = {
  key: "cell-x" + x + "-y" + y,
  x: x,
  y: y,
  ant: false,
  revealed: false,
  display: squares.unclicked,
  flagged: false,
  nearbyAnts: 0,
  neighbors: [],
};
