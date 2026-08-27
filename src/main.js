import { createEmptyBoard, isValidMove, makeMove, getWinner, getWinningLine, isTie } from './board.js';
import { getMove } from './ai.js';
import { renderBoard, setStatus, renderScore } from './ui.js';

const PLAYER = 'X';
const AI = 'O';

let board = createEmptyBoard();
let gameOver = false;
const score = { wins: 0, losses: 0, ties: 0 };

const difficultySelect = document.getElementById('difficulty');
const newGameButton = document.getElementById('new-game');

function render() {
  renderBoard(board, getWinningLine(board), handleCellClick);
}

function finishIfGameOver() {
  const winner = getWinner(board);

  if (winner === PLAYER) {
    score.wins++;
    setStatus('You win!');
  } else if (winner === AI) {
    score.losses++;
    setStatus('Computer wins.');
  } else if (isTie(board)) {
    score.ties++;
    setStatus("It's a tie.");
  } else {
    return false;
  }

  gameOver = true;
  renderScore(score);
  render();
  return true;
}

function handleCellClick(index) {
  if (gameOver || !isValidMove(board, index)) return;

  board = makeMove(board, index, PLAYER);
  render();
  if (finishIfGameOver()) return;

  const aiIndex = getMove(board, AI, PLAYER, difficultySelect.value);
  board = makeMove(board, aiIndex, AI);
  render();
  if (finishIfGameOver()) return;

  setStatus('Your move.');
}

function newGame() {
  board = createEmptyBoard();
  gameOver = false;
  setStatus('Your move.');
  render();
}

newGameButton.addEventListener('click', newGame);

renderScore(score);
newGame();
