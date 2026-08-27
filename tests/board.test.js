import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getWinner,
  getWinningLine,
  createEmptyBoard,
  isValidMove,
  makeMove,
  getEmptyCells,
  isTie,
} from '../src/board.js';

test('getWinner detects a completed top row', () => {
  const board = ['X', 'X', 'X', null, null, null, null, null, null];
  assert.equal(getWinner(board), 'X');
});

test('getWinner detects a completed left column', () => {
  const board = ['O', null, null, 'O', null, null, 'O', null, null];
  assert.equal(getWinner(board), 'O');
});

test('getWinner detects a completed diagonal', () => {
  const board = ['X', null, null, null, 'X', null, null, null, 'X'];
  assert.equal(getWinner(board), 'X');
});

test('getWinner returns null when no line is complete', () => {
  const board = ['X', 'O', null, null, null, null, null, null, null];
  assert.equal(getWinner(board), null);
});

test('createEmptyBoard returns 9 empty cells', () => {
  assert.deepEqual(createEmptyBoard(), [null, null, null, null, null, null, null, null, null]);
});

test('isValidMove is true for an empty cell', () => {
  const board = createEmptyBoard();
  assert.equal(isValidMove(board, 4), true);
});

test('isValidMove is false for an occupied cell', () => {
  const board = createEmptyBoard();
  board[4] = 'X';
  assert.equal(isValidMove(board, 4), false);
});

test('makeMove places the symbol without mutating the original board', () => {
  const board = createEmptyBoard();
  const next = makeMove(board, 4, 'X');
  assert.equal(next[4], 'X');
  assert.equal(board[4], null);
});

test('getEmptyCells returns indices of empty cells', () => {
  const board = ['X', 'O', null, null, 'X', null, null, null, null];
  assert.deepEqual(getEmptyCells(board), [2, 3, 5, 6, 7, 8]);
});

test('isTie is true when the board is full with no winner', () => {
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
  assert.equal(isTie(board), true);
});

test('isTie is false when there are empty cells', () => {
  const board = ['X', 'O', null, null, null, null, null, null, null];
  assert.equal(isTie(board), false);
});

test('isTie is false when there is a winner', () => {
  const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  assert.equal(isTie(board), false);
});

test('getWinningLine returns the indices of the completed line', () => {
  const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
  assert.deepEqual(getWinningLine(board), [0, 1, 2]);
});

test('getWinningLine returns null when there is no winner', () => {
  const board = ['X', 'O', null, null, null, null, null, null, null];
  assert.equal(getWinningLine(board), null);
});
