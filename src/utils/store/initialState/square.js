import { squares } from '../../../imgs/icons';

const buildSquare = (x, y) => {
  return {
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
};

export default buildSquare;
