import {
  GameInput,
  GameState,
  Grid,
  HighScore,
  S3,
  Score
} from './classes/index.js';
import {
  IShape,
  JShape,
  LShape,
  OShape,
  SShape,
  TShape,
  ZShape
} from './classes/Shape';
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Game {
  constructor() {
    this.grid = new Grid(20, 10);
    this.shape = new LShape();
    this.score = new Score();
    this.gameState = new GameState(this.grid, this.shape, this.score);
    this.highScore = new HighScore();
    this.s3 = new S3();
    this.input = new GameInput();
    this.isPaused = false;
    this.isRunning = false;
    this.isGameOver = false;
    this.lastUpdate = Date.now();
  }

  // The game loop should have a method that starts the game loop.
  start() {
    this.isRunning = true;
    this.input.attachEventListeners();
    this.update();
  }

  // The game loop should have a method that stops the game loop.
  stop() {
    this.isRunning = false;
    this.input.detachEventListeners();
  }

  // The game loop should have a method that updates the game state.
  update() {
    if (this.isRunning) {
      this.handleInput();
      const now = Date.now();
      if (now - this.lastUpdate >= 1000) {
        this.updateGameState();
        this.lastUpdate = now;
      }
      this.render();
      requestAnimationFrame(() => this.update());
    }
  }

  // The game loop should have a method that renders the game state.
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderGrid();
    this.renderShape();
    this.renderScore();
    this.renderHighScore();
    this.renderGameOver();
  }

  // The game loop should have a method that checks if the game is over, paused, and running.
  gameOver() {
    if (this.gameState.isGameOver()) {
      this.isGameOver = true;
      this.stop();
    }
  }
  // The game loop should have a method that checks if the game is paused.
  isGamePaused() {
    return this.isPaused;
  }

  // The game loop should have a method that checks if the game is running.
  isGameRunning() {
    return this.isRunning;
  }

  // The game loop should handle the input.
  handleInput() {
    const input = this.input.getInput();
    switch (input) {
      case 'left':
        if (this.gameState.canMoveLeft()) {
          this.gameState.moveLeft();
        }
        break;
      case 'right':
        if (this.gameState.canMoveRight()) {
          this.gameState.moveRight();
        }
        break;
      case 'down':
        if (this.gameState.canMoveDown()) {
          this.gameState.moveDown();
        }
        break;
      case 'rotate':
        if (this.gameState.canRotate()) {
          this.gameState.rotate();
        }
        break;
      default:
        break;
    }
  }

  createRandomShape() {
    const shapeTypes = [IShape, OShape, TShape, SShape, ZShape, JShape, LShape];
    const randomIndex = Math.floor(Math.random() * shapeTypes.length);
    return new shapeTypes[randomIndex]();
  }

  // The game loop should update the game state.
  updateGameState() {
    if (this.gameState.canMoveDown()) {
      this.gameState.moveDown();
    } else {
      this.gameState.placeShape();
      this.gameState.clearFullRows();
      this.gameState.increaseScore();
      this.gameState.shape = this.createRandomShape();
    }
  }

  // The game loop should render the grid.
  renderGrid() {
    this.grid.showGridState(ctx);
  }

  // The game loop should render the shape.
  renderShape() {
    for (let i = 0; i < this.gameState.shape.shape.length; i++) {
      for (let j = 0; j < this.gameState.shape.shape[i].length; j++) {
        if (this.gameState.shape.shape[i][j] === 1) {
          ctx.fillStyle = this.gameState.shape.color;
          ctx.fillRect(
            (this.gameState.shape.x + j) * 20,
            (this.gameState.shape.y + i) * 20,
            20,
            20
          );
        }
      }
    }
  }

  // The game loop should render the score.
  renderScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${this.gameState.score.score}`, 0, 20);
  }

  // The game loop should render the high score.
  renderHighScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`High Score: ${this.highScore.highScore}`, 0, 40);
  }

  // The game loop should render the game over.
  renderGameOver() {
    if (this.isGameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText('Game Over', 0, 60);
    }
  }
}

// Start the game.
const game = new Game();
game.start();
