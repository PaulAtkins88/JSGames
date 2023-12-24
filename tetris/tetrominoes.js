// Tetromino shapes and colors
export const I = { shape: [[1, 1, 1, 1]], color: 'cyan' };
export const J = {
  shape: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  color: 'blue'
};
export const L = {
  shape: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  color: 'orange'
};
export const O = {
  shape: [
    [1, 1],
    [1, 1]
  ],
  color: 'yellow'
};
export const S = {
  shape: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  color: 'green'
};
export const T = {
  shape: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  color: 'purple'
};
export const Z = {
  shape: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  color: 'red'
};

// Array of all tetrominoes
export const TETROMINOES = [I, J, L, O, S, T, Z];

// Function to rotate a tetromino
export function rotate(tetromino) {
  // Create a new array with the rows of the tetromino transposed to columns
  const rotatedTetromino = tetromino[0].map((val, index) =>
    tetromino.map((row) => row[index])
  );
  // Reverse the order of the rows to rotate the tetromino
  rotatedTetromino.reverse();
  return rotatedTetromino;
}
