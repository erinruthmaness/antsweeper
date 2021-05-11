//called on a clicked square with zero ants around it
// export const uncoverNeighbors = (clicked, board) => {
//   let totalSquares = board.length * board[0].length;
//   let uncoverAll = [];

//   clicked.neighbors.forEach((neighborsq) => {
    // all neighbors around the zero will need to be uncovered
    // uncoverAll.push(updatedClickedZero(board[neighborsq.col][neighborsq.row]));
    //if the neighbor is also a zero, then its neighbors are all zeroes
    // * at this point we've covered three columns and three rows
    // totalSquares = totalSquares - 9;
    //   if (neighborsq.nearbyAnts === 0 && !neighborsq.revealed) {
        // clicked.neighbors.forEach((neighborsq_2) => {
        //   uncoverAll.push(
            // updatedClickedZero(board[neighborsq_2.col][neighborsq_2.row])
        //   );
        // });
        // totalSquares = totalSquares - 9;
    //   }
//   });

  //   return board;
// };

/*const nextdoorNeighbors = (initSq, totalSquares, listOfSquaresToUncover) => {
    if (initSq.nearbyAnts === 0 && !initSq.revealed) {
        clicked.neighbors.forEach((neighborsq_2) => {
            listOfSquaresToUncover.push(
            updatedClickedZero(board[neighborsq_2.col][neighborsq_2.row])
          );
        });
        totalSquares = totalSquares - 9;
      }
}*/

/*const updatedClickedZero = (sq) => {
  return {
    square: {
      ...sq,
      display: sq.nearbyAnts === 0 ? "" : sq.nearbyAnts,
      revealed: true,
    },
  };
};*/
