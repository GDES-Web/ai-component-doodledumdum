// Define variables to keep track of game state
var currentPlayer = 1; // Player 1 starts first
var board = []; // 2D array to represent the game board
var numRows = 6;
var numCols = 7;

// Initialize the game board with empty cells
for (var row = 0; row < numRows; row++) {
  board[row] = [];
  for (var col = 0; col < numCols; col++) {
    board[row][col] = 0;
  }
}

// Add event listeners to the cells
var cells = document.getElementsByTagName("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    // Get the row and column of the clicked cell
    var col = this.cellIndex;
    var row = getEmptyRow(col);

    if (row !== -1) {
      // Add the player's piece to the board and update the display
      board[row][col] = currentPlayer;
      this.style.backgroundColor = (currentPlayer === 1) ? "red" : "yellow";
      
      // Check for a winner and switch players if the game is not over
      if (checkWinner(row, col)) {
        alert("Player " + currentPlayer + " wins!");
        resetGame();
      } else if (checkDraw()) {
        alert("Draw!");
        resetGame();
      } else {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
      }
    }
  });
}

// Returns the row of the first empty cell in the given column, or -1 if the column is full
function getEmptyRow(col) {
  for (var row = numRows - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      return row;
    }
  }
  return -1;
}

// Checks if the last move resulted in a win
function checkWinner(row, col) {
  var piece = board[row][col];
  var count = 0;

  // Check horizontally
  for (var c = 0; c < numCols; c++) {
    if (board[row][c] === piece) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check vertically
  count = 0;
  for (var r = 0; r < numRows; r++) {
    if (board[r][col] === piece) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check diagonals
  count = 0;
  for (var i = -3; i <= 3; i++) {
    var r = row + i;
    var c = col + i;
    if (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c] === piece) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  count = 0;
  for (var i = -3; i <= 3; i++) {
    var r = row - i;
    var c = col + i;
    if (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r]);
  }
}