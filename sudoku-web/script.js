// Create the 9x9 input grid when page loads
window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("sudoku-grid");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "9";
      input.id = `cell-${i}-${j}`;
      grid.appendChild(input);
    }
  }
});

// Helper functions
function getGrid() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const val = document.getElementById(`cell-${i}-${j}`).value;
      row.push(val === "" ? 0 : parseInt(val));
    }
    board.push(row);
  }
  return board;
}

function setGrid(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = board[i][j] === 0 ? "" : board[i][j];
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solve() {
  const board = getGrid();
  if (solveSudoku(board)) {
    setGrid(board);
    alert("Sudoku Solved!");
  } else {
    alert("No solution exists.");
  }
}

function clearBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = "";
    }
  }
}
