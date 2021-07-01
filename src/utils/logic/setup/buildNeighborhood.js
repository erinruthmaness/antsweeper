//takes an array and an index and returns
//[the value of the index before, the specified index, and the next index]
//or null if there is no index before or after
// (sort of like array.slice but replacing a non-existent or negative index with null)
const buildRow = (row, myIndex) => {
  return [
    myIndex - 1 >= 0 ? row[myIndex - 1] : null,
    row[myIndex],
    myIndex + 1 < row.length ? row[myIndex + 1] : null,
  ];
};

//takes an array of arrays and specified "row" and "col" indeces
//and returns an array of nine values: essentially the value of the specified "cell"
//and the values of all the cells that "touch" it in the "grid"
export const buildNeighborhood = (wholeBoard, thisRow, thisCol) => {
  let rowAbove =
    thisRow - 1 >= 0
      ? buildRow(wholeBoard[thisRow - 1], thisCol)
      : [null, null, null];
  let myRow = buildRow(wholeBoard[thisRow], thisCol);
  let rowBelow =
    thisRow + 1 < wholeBoard.length
      ? buildRow(wholeBoard[thisRow + 1], thisCol)
      : [null, null, null];
  return rowAbove.concat(myRow, rowBelow);
};

export default buildNeighborhood;
