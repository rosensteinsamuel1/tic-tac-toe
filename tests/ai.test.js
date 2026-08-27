import test from 'node:test';
import assert from 'node:assert/strict';
import { easyMove, mediumMove, hardMove, getMove } from '../src/ai.js';
import { createEmptyBoard, makeMove, getWinner, isTie, getEmptyCells } from '../src/board.js';

test('easyMove picks the only empty cell when just one remains', () => {
  const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', null];
  assert.equal(easyMove(board), 8);
});

test('easyMove uses the injected random source to pick among empty cells', () => {
  const board = ['X', null, null, 'O', null, null, null, null, null];
  const empty = [1, 2, 4, 5, 6, 7, 8];

  assert.equal(easyMove(board, () => 0), empty[0]);
  assert.equal(easyMove(board, () => 0.999), empty[empty.length - 1]);
});

test('mediumMove takes a winning move when one is available', () => {
  const board = ['X', 'X', null, 'O', 'O', null, null, null, null];
  assert.equal(mediumMove(board, 'X', 'O'), 2);
});

test('mediumMove blocks the opponent when it has no winning move of its own', () => {
  const board = ['O', 'O', null, 'X', null, null, null, null, null];
  assert.equal(mediumMove(board, 'X', 'O'), 2);
});

test('mediumMove falls back to the injected random source', () => {
  const board = ['X', null, null, 'O', null, null, null, null, null];
  const empty = [1, 2, 4, 5, 6, 7, 8];
  assert.equal(mediumMove(board, 'X', 'O', () => 0), empty[0]);
});

test('hardMove takes an immediate winning move when available', () => {
  const board = ['X', 'X', null, 'O', 'O', null, null, null, null];
  assert.equal(hardMove(board, 'X', 'O'), 2);
});

test('hardMove blocks an immediate loss when it has no win of its own', () => {
  const board = ['O', 'O', null, 'X', null, null, null, null, null];
  assert.equal(hardMove(board, 'X', 'O'), 2);
});

test('hardMove never loses across many full games against a random opponent', () => {
  let seed = 42;
  const seededRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let game = 0; game < 50; game++) {
    let board = createEmptyBoard();
    let turn = 'random-first';

    while (getWinner(board) === null && !isTie(board)) {
      if (turn === 'random-first') {
        const empty = getEmptyCells(board);
        const index = empty[Math.floor(seededRandom() * empty.length)];
        board = makeMove(board, index, 'O');
        turn = 'hard';
      } else {
        const index = hardMove(board, 'X', 'O');
        board = makeMove(board, index, 'X');
        turn = 'random-first';
      }
    }

    assert.notEqual(getWinner(board), 'O', `hard AI lost game ${game}`);
  }
});

test('getMove dispatches to the strategy matching the given difficulty', () => {
  const board = ['X', 'X', null, 'O', 'O', null, null, null, null];
  assert.equal(getMove(board, 'X', 'O', 'hard'), 2);
  assert.equal(getMove(board, 'X', 'O', 'medium'), 2);
});
