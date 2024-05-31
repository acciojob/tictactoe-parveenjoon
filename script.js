document.addEventListener('DOMContentLoaded', function() {
  const nameForm = document.getElementById('nameForm');
  const submitButton = document.getElementById('submit');
  const messageDiv = document.querySelector('.message');
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 1;
  let player1Name = '';
  let player2Name = '';

  nameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    if (player1Name && player2Name) {
      nameForm.style.display = 'none';
      messageDiv.textContent = `${player1Name}, you're up!`;
    }
  });

  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      if (!this.textContent && player1Name && player2Name) {
        if (currentPlayer === 1) {
          this.textContent = 'X';
          currentPlayer = 2;
          messageDiv.textContent = `${player2Name}, you're up!`;
        } else {
          this.textContent = 'O';
          currentPlayer = 1;
          messageDiv.textContent = `${player1Name}, you're up!`;
        }
        checkWinner();
      }
    });
  });

  function checkWinner() {
    const winningCombos = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
      [1, 5, 9], [3, 5, 7]             // Diagonals
    ];
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (cells[a - 1].textContent && cells[a - 1].textContent === cells[b - 1].textContent && cells[a - 1].textContent === cells[c - 1].textContent) {
        if (currentPlayer === 1) {
          messageDiv.textContent = `${player2Name} congratulations, you won!`;
        } else {
          messageDiv.textContent = `${player1Name} congratulations, you won!`;
        }
        cells.forEach(cell => cell.removeEventListener('click', checkWinner));
      }
    });
  }
});
