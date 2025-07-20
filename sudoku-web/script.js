// Create 9x9 input grid dynamically
const grid = document.getElementById("sudoku-grid");

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");
    input.setAttribute("id", `cell-${i}-${j}`);
    grid.appendChild(input);
  }
}

function getBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const val = parseInt(document.getElementById(`cell-${i}-${j}`).value);
      row.push(isNaN(val) ? 0 : val);
    }
    board.push(row);
  }
  return board;
}

function updateUI(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = board[i][j];
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + i % 3;
    if (board[boxRow][boxCol] === num) return false;
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
  const board = getBoard();
  if (solveSudoku(board)) {
    updateUI(board);
  } else {
    alert("No solution found!");
  }
}

function clearBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = "";
    }
  }
}
