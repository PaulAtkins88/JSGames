import {
  GRID_HEIGHT,
  GRID_WIDTH,
  canMoveTo,
  clearLines,
  createGrid
} from './grid.js';
import { TETROMINOES, rotate } from './tetrominoes.js';

//#region canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const nextTetrominoCanvas = document.getElementById('nextTetrominoCanvas');
const nextTetrominoCtx = nextTetrominoCanvas.getContext('2d');

const audio = document.getElementById('theme-song');
const clearLineSound = new Audio('assets/sound/clearLine.wav');
const clearLineFourSound = new Audio('assets/sound/clearLineFour.wav');

// #endregion

// #region game variables
let gameStarted = false;
let gamePaused = false;
let lastTime = Date.now();
const updateInterval = 1000;
let accumulatedTime = 0;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

let grid = createGrid();

let currentTetromino;
let currentTetrominoShape = [];
let nextTetromino = Math.floor(Math.random() * TETROMINOES.length);

let tetrominoRow = 0;
let tetrominoCol = Math.floor(GRID_WIDTH / 2);

// #endregion

// #region functions
/**
 * Spawns a new tetromino on the grid.
 *
 * @returns {boolean} Returns true if the new tetromino can be placed on the grid, false otherwise.
 */
function spawnTetromino() {
  currentTetromino = nextTetromino;
  currentTetrominoShape = TETROMINOES[currentTetromino].shape;
  nextTetromino = Math.floor(Math.random() * TETROMINOES.length);
  tetrominoRow = 0;
  tetrominoCol = Math.floor(GRID_WIDTH / 2);
  // If the new Tetromino can't be placed on the grid, the game is over
  return !!canMoveTo(
    grid,
    tetrominoRow,
    tetrominoCol,
    TETROMINOES[currentTetromino].shape
  );
}

/**
 * Draws the next tetromino on the canvas.
 */
function drawNextTetromino() {
  nextTetrominoCtx.clearRect(
    0,
    0,
    nextTetrominoCanvas.width,
    nextTetrominoCanvas.height
  );
  const offsetX =
    (nextTetrominoCanvas.width -
      TETROMINOES[nextTetromino].shape[0].length * 30) /
    2;
  const offsetY =
    (nextTetrominoCanvas.height -
      TETROMINOES[nextTetromino].shape.length * 30) /
    2;
  for (let row = 0; row < TETROMINOES[nextTetromino].shape.length; row++) {
    for (
      let col = 0;
      col < TETROMINOES[nextTetromino].shape[row].length;
      col++
    ) {
      if (TETROMINOES[nextTetromino].shape[row][col] !== 0) {
        nextTetrominoCtx.fillStyle = TETROMINOES[nextTetromino].color;
        nextTetrominoCtx.fillRect(
          offsetX + col * 30,
          offsetY + row * 30,
          30,
          30
        );
      }
    }
  }
}

/**
 * Renders the game grid and the current Tetromino on the canvas.
 */
function render() {
  // Create a copy of the grid
  const gridCopy = JSON.parse(JSON.stringify(grid));
  // Draw the current Tetromino on the grid copy
  for (let r = 0; r < currentTetrominoShape.length; r++) {
    for (let c = 0; c < currentTetrominoShape[r].length; c++) {
      if (currentTetrominoShape[r][c] !== 0) {
        gridCopy[tetrominoRow + r][tetrominoCol + c] = currentTetromino + 1;
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < GRID_HEIGHT; r++) {
    for (let c = 0; c < GRID_WIDTH; c++) {
      // Draw the square
      ctx.fillStyle = 'black';
      ctx.fillRect(c * 30, r * 30, 30, 30);
      // Draw the outline
      ctx.strokeStyle = 'gray';
      ctx.strokeRect(c * 30, r * 30, 30, 30);
      // Draw the block, if there's one in the current square
      if (gridCopy[r][c] !== 0) {
        ctx.fillStyle = TETROMINOES[gridCopy[r][c] - 1].color;
        ctx.fillRect(c * 30, r * 30, 30, 30);
      }
    }
  }
}

/**
 * Resets the game by initializing the game state and starting a new game loop.
 */
function resetGame() {
  document.getElementById('gameOverOverlay').style.display = 'none';
  document.getElementById('gameOverScreen').style.display = 'none';

  score = 0;
  document.getElementById('score').textContent = 'Score: ' + score;
  grid = createGrid(GRID_WIDTH, GRID_HEIGHT);
  gameStarted = true;
  gamePaused = false;
  currentTetromino = Math.floor(Math.random() * TETROMINOES.length);
  currentTetrominoShape = TETROMINOES[currentTetromino].shape;
  tetrominoRow = 0;
  tetrominoCol = Math.floor(GRID_WIDTH / 2);
  spawnTetromino();
  requestAnimationFrame(gameLoop);
}

/**
 * The main game loop that updates the game state, renders the game, and continues the loop.
 */
function gameLoop() {
  if (!gameStarted) {
    return;
  }
  if (gamePaused) {
    return;
  }
  const now = Date.now();
  const deltaTime = now - lastTime;
  lastTime = now;

  accumulatedTime += deltaTime;

  while (accumulatedTime >= updateInterval) {
    // Update game state
    if (
      canMoveTo(grid, tetrominoRow + 1, tetrominoCol, currentTetrominoShape)
    ) {
      tetrominoRow++;
    } else {
      // Add the current tetromino to the grid
      for (let row = 0; row < currentTetrominoShape.length; row++) {
        for (let col = 0; col < currentTetrominoShape[row].length; col++) {
          if (currentTetrominoShape[row][col] !== 0) {
            grid[tetrominoRow + row][tetrominoCol + col] = currentTetromino + 1;
          }
        }
      }

      // If the Tetromino can't move down, spawn a new one
      if (!spawnTetromino()) {
        // If a new Tetromino can't be spawned, the game is over
        document.getElementById('gameOverOverlay').style.display = 'block';
        document.getElementById('gameOverScreen').style.display = 'block';
        gameStarted = false;
        return;
      }

      // Clear any full lines
      let numberOfLinesCleared = clearLines(grid);
      // Increase the score based on the number of cleared lines
      if (numberOfLinesCleared > 0) {
        score += 50 * 2 ** (numberOfLinesCleared - 1);
        // If the current score is higher than the highest score, update the highest score
        if (score > bestScore) {
          bestScore = score;
          localStorage.setItem('bestScore', bestScore);
        }
        // Update the score display
        document.getElementById('score').textContent = 'Score: ' + score;
        document.getElementById('bestScore').textContent = 'Best: ' + bestScore;

        // if 4 lines or more are cleared, play the 4 line clear sound, else play the normal clear sound
        if (numberOfLinesCleared >= 4) {
          clearLineFourSound.play();
        } else {
          clearLineSound.play();
        }
      }
    }

    accumulatedTime -= updateInterval;
  }

  // Render the game
  render();

  // Draw the next Tetromino
  drawNextTetromino();

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// #endregion

// #region event listeners
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (
        canMoveTo(grid, tetrominoRow, tetrominoCol - 1, currentTetrominoShape)
      ) {
        tetrominoCol--;
      }
      break;
    case 'ArrowRight':
      if (
        canMoveTo(grid, tetrominoRow, tetrominoCol + 1, currentTetrominoShape)
      ) {
        tetrominoCol++;
      }
      break;
    case 'ArrowDown':
      if (
        canMoveTo(grid, tetrominoRow + 1, tetrominoCol, currentTetrominoShape)
      ) {
        tetrominoRow++;
      }
      break;
    case 'ArrowUp': {
      const rotatedTetromino = rotate(currentTetrominoShape);
      if (canMoveTo(grid, tetrominoRow, tetrominoCol, rotatedTetromino)) {
        currentTetrominoShape = rotatedTetromino;
      }
      break;
    }
    case ' ':
      event.preventDefault();
      // dead drop a piece
      while (
        canMoveTo(grid, tetrominoRow + 1, tetrominoCol, currentTetrominoShape)
      ) {
        tetrominoRow++;
      }
      break;
  }
});

document.getElementById('restartButton').addEventListener('click', resetGame);

document.getElementById('startButton').addEventListener('click', () => {
  // Start the game loop
  if (!gameStarted) {
    gameStarted = true;
    currentTetromino = Math.floor(Math.random() * TETROMINOES.length);
    currentTetrominoShape = TETROMINOES[currentTetromino].shape;
    spawnTetromino();
    requestAnimationFrame(gameLoop);
  }
});

document.getElementById('pauseButton').addEventListener('click', () => {
  gamePaused = !gamePaused;
  if (!gamePaused) {
    requestAnimationFrame(gameLoop);
  }
});

document.getElementById('resetButton').addEventListener('click', resetGame);

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

canvas.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (diffX > 0) {
      // Swipe left
      if (
        canMoveTo(grid, tetrominoRow, tetrominoCol - 1, currentTetrominoShape)
      ) {
        tetrominoCol--;
      }
    } else {
      // Swipe right
      if (
        canMoveTo(grid, tetrominoRow, tetrominoCol + 1, currentTetrominoShape)
      ) {
        tetrominoCol++;
      }
    }
  } else {
    // Vertical swipe
    if (diffY > 0) {
      // Swipe up
      const rotatedTetromino = rotate(currentTetrominoShape);
      if (canMoveTo(grid, tetrominoRow, tetrominoCol, rotatedTetromino)) {
        currentTetrominoShape = rotatedTetromino;
      }
    } else {
      // Swipe down
      if (
        canMoveTo(grid, tetrominoRow + 1, tetrominoCol, currentTetrominoShape)
      ) {
        tetrominoRow++;
      }
    }
  }
});

document.getElementById('speaker-on').addEventListener('click', function () {
  audio.pause();
  this.style.display = 'none';
  document.getElementById('speaker-off').style.display = 'inline-block';
});

document.getElementById('speaker-off').addEventListener('click', function () {
  audio.play();
  this.style.display = 'none';
  document.getElementById('speaker-on').style.display = 'inline-block';
});
// #endregion

// #region on load
window.onload = function () {
  audio.play();
};
// #endregion


render();
