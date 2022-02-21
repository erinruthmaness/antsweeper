export const checkForWin = (board, gameParams) => {
    let unclickedSafe = gameParams.rows * gameParams.cols - gameParams.ants;
    board.forEach((row, y) => {
        board.forEach((col, x) => {
            if (!board[y][x].ant && board[y][x].revealed) {
                unclickedSafe--;
            }
        });
    });
    if (unclickedSafe === 0) {
        return true;
    } else {
        return false;
    }
};