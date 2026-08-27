export function renderBoard(board, winningLine, onCellClick) {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  board.forEach((cell, index) => {
    const button = document.createElement('button');
    button.className = 'cell';
    if (winningLine?.includes(index)) button.classList.add('winning');
    button.textContent = cell ?? '';
    button.disabled = cell !== null;
    button.setAttribute('aria-label', `Cell ${index + 1}`);
    button.addEventListener('click', () => onCellClick(index));
    boardEl.appendChild(button);
  });
}

export function disableBoard() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.disabled = true;
  });
}

export function setStatus(message) {
  document.getElementById('status').textContent = message;
}

export function renderScore(score) {
  document.getElementById('score-wins').textContent = score.wins;
  document.getElementById('score-losses').textContent = score.losses;
  document.getElementById('score-ties').textContent = score.ties;
}
