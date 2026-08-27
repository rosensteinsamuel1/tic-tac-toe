import { getEmptyCells, makeMove, getWinner, isTie } from './board.js';

export function easyMove(board, random = Math.random) {
  const empty = getEmptyCells(board);
  return empty[Math.floor(random() * empty.length)];
}

function findWinningMove(board, symbol) {
  return getEmptyCells(board).find(
    (index) => getWinner(makeMove(board, index, symbol)) === symbol
  );
}

export function mediumMove(board, aiSymbol, playerSymbol, random = Math.random) {
  const winningMove = findWinningMove(board, aiSymbol);
  if (winningMove !== undefined) return winningMove;

  const blockingMove = findWinningMove(board, playerSymbol);
  if (blockingMove !== undefined) return blockingMove;

  return easyMove(board, random);
}

function minimax(board, aiSymbol, playerSymbol, isAiTurn, depth) {
  const winner = getWinner(board);
  if (winner === aiSymbol) return 10 - depth;
  if (winner === playerSymbol) return depth - 10;
  if (isTie(board)) return 0;

  const symbol = isAiTurn ? aiSymbol : playerSymbol;
  const scores = getEmptyCells(board).map((index) =>
    minimax(makeMove(board, index, symbol), aiSymbol, playerSymbol, !isAiTurn, depth + 1)
  );

  return isAiTurn ? Math.max(...scores) : Math.min(...scores);
}

export function hardMove(board, aiSymbol, playerSymbol) {
  const empty = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMove = empty[0];

  for (const index of empty) {
    const score = minimax(makeMove(board, index, aiSymbol), aiSymbol, playerSymbol, false, 1);
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

export function getMove(board, aiSymbol, playerSymbol, difficulty, random = Math.random) {
  if (difficulty === 'hard') return hardMove(board, aiSymbol, playerSymbol);
  if (difficulty === 'medium') return mediumMove(board, aiSymbol, playerSymbol, random);
  return easyMove(board, random);
}
