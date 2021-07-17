import buildSquare from "../../../../utils/store/initialState/square";

//make an array of arrays of "squares"
const newRound = (rows, cols) => {
  return Array.from(Array(rows), (row, y) => {
    return Array.from(Array(cols), (col, x) =>
      buildSquare(x, y)
    );
  });
};

export default newRound;
