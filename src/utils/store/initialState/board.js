import { faces } from '../../logic/icons';

const getInitialBoard = (paramContextOBJ) => {
  return {
    board: [],
    level: paramContextOBJ.level,
    parameters: {
      rows: paramContextOBJ.rows,
      cols: paramContextOBJ.cols,
      ants: paramContextOBJ.ants,
      antList: [],
    },
    flags: 0,
    face: faces.sleeping,
  };
};

export default getInitialBoard;
