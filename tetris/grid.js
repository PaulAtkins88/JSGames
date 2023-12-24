// Constants for grid dimensions
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

/**
 * Creates a grid for the Tetris game.
 * @returns {number[][]} The grid with initial values of 0.
 */
export function createGrid() {
  return Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));
}

/**
 * Checks if a tetromino can be moved to the specified position on the grid.
 * @param {number[][]} grid - The grid representing the game board.
 * @param {number} row - The row index of the top-left corner of the tetromino.
 * @param {number} col - The column index of the top-left corner of the tetromino.
 * @param {number[][]} tetromino - The tetromino to be moved.
 * @returns {boolean} - True if the tetromino can be moved to the specified position, false otherwise.
 */
export function canMoveTo(grid, row, col, tetromino) {
  for (let r = 0; r < tetromino.length; r++) {
    for (let c = 0; c < tetromino[r].length; c++) {
      // Ignore empty squares in the Tetromino
      if (tetromino[r][c] === 0) {
        continue;
      }
      // Check if the square is outside the grid
      if (
        row + r < 0 ||
        row + r >= GRID_HEIGHT ||
        col + c < 0 ||
        col + c >= GRID_WIDTH
      ) {
        return false;
      }
      // Check if the square is occupied
      if (grid[row + r][col + c] !== 0) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Clears complete lines in the grid and returns the number of lines cleared.
 *
 * @param {Array<Array<number>>} grid - The grid representing the game board.
 * @returns {number} The number of lines cleared.
 */
export function clearLines(grid) {
  let numberOfLinesCleared = 0;
  for (let r = 0; r < GRID_HEIGHT; r++) {
    if (grid[r].every((value) => value !== 0)) {
      // Remove the row from the grid
      grid.splice(r, 1);
      // Add a new empty row at the top
      grid.unshift(Array(GRID_WIDTH).fill(0));

      // Increase the cleared lines count
      numberOfLinesCleared++;
    }
  }
  return numberOfLinesCleared;
}
