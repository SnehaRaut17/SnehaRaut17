# 🔢 Sudoku Solver (Console-Based)

A C++ program that solves any valid 9x9 Sudoku puzzle using the **backtracking algorithm**. Designed for terminal/console use and optimized with constraint checks for rows, columns, and 3x3 boxes.

---

## ✅ Features
- Takes user input via terminal
- Efficient backtracking solution
- Handles invalid or unsolvable boards
- Clean and minimal code structure

---

## 🧠 Algorithm
Uses recursive backtracking:
- Try placing 1 to 9 in each empty cell
- Check if placing number is valid in row, column, and 3x3 box
- Backtrack when stuck

---

## 📥 Input Format
Enter a 9x9 Sudoku puzzle as input:
- Use **0** to represent empty cells
- One row per line with 9 integers separated by spaces

---

## ▶️ How to Run

### Compile and Run (using g++):
```bash
g++ Sudoku_Solver.cpp -o sudoku_solver
./sudoku_solver
