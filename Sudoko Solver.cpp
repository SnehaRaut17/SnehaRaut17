#include <iostream>
#include <fstream>
using namespace std;

const int N = 9;
int board[N][N];

// Check if number is valid in row, col, and box
bool isValid(int row, int col, int num) {
    for (int i = 0; i < N; i++) {
        if (board[row][i] == num || board[i][col] == num)
            return false;
    }

    int startRow = row - row % 3;
    int startCol = col - col % 3;

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (board[startRow + i][startCol + j] == num)
                return false;

    return true;
}

// Backtracking function to solve sudoku
bool solveSudoku() {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            if (board[row][col] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku())
                            return true;
                        board[row][col] = 0;
                    }
                }
                return false; // No number fits
            }
        }
    }
    return true; // Solved
}

// Function to read sudoku board from file
void readFromFile(const string& filename) {
    ifstream file(filename);
    if (!file) {
        cout << "Error opening file!\n";
        exit(1);
    }

    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            file >> board[i][j];

    file.close();
}

// Function to write sudoku board to file
void writeToFile(const string& filename) {
    ofstream file(filename);
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < N; ++j)
            file << board[i][j] << " ";
        file << "\n";
    }
    file.close();
}

void printBoard() {
    for (int i = 0; i < N; ++i) {
        for (int j = 0; j < N; ++j)
            cout << board[i][j] << " ";
        cout << endl;
    }
}

int main() {
    readFromFile("sudoku_input.txt");

    cout << "Original Sudoku:\n";
    printBoard();

    if (solveSudoku()) {
        cout << "\nSolved Sudoku:\n";
        printBoard();
        writeToFile("sudoku_output.txt");
    } else {
        cout << "Sudoku cannot be solved.\n";
    }

    return 0;
}
