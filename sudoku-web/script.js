// Create grid inputs
const grid = document.getElementById("sudoku-grid");

for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", 1);
  input.setAttribute("max", 9);
  input.setAttribute("maxlength", 1);
  input.id = `cell-${Math.floor(i / 9)}-${i % 9}`;
  grid.appendChild(input);
}

// Get board from input
function getBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      const val = document.getElementById(`cell-${i}-${j}`).value;
      board[i][j] = val === "" ? 0 : parseInt(val);
    }
  }
  return board;
}

// Set board to UI
function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value =
        board[i][j] === 0 ? "" : board[i][j];
    }
  }
}

// Check if placing num is valid
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num)
      return false;
  }

  const boxRow = row - (row % 3);
  const boxCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num)
        return false;
    }
  }
  return true;
}

// Backtracking Solver
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

// Solve button action
function solve() {
  const board = getBoard();
  const success = solveSudoku(board);
  if (success) {
    setBoard(board);
    alert("Solved Successfully!");
  } else {
    alert("No solution exists.");
  }
}

// Clear button action
function clearGrid() {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      document.getElementById(`cell-${i}-${j}`).value = "";
}
