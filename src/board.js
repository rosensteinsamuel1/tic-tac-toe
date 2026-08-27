const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinningLine(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

export function getWinner(board) {
  const line = getWinningLine(board);
  return line ? board[line[0]] : null;
}

export function createEmptyBoard() {
  return Array(9).fill(null);
}

export function isValidMove(board, index) {
  return board[index] === null;
}

export function makeMove(board, index, symbol) {
  const next = board.slice();
  next[index] = symbol;
  return next;
}

export function getEmptyCells(board) {
  return board.reduce((cells, cell, index) => {
    if (cell === null) cells.push(index);
    return cells;
  }, []);
}

export function isTie(board) {
  return getWinner(board) === null && getEmptyCells(board).length === 0;
}
