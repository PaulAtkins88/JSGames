// Step 4. GameState class.
export default class GameState {
  // The game state should have a grid, a shape, and a score.
  /**
   *
   * @param {Grid} grid
   * @param {Shape} shape
   * @param {Score} score
   */
  constructor(grid, shape, score) {
    this.grid = grid;
    this.shape = shape;
    this.score = score;
  }

  // The game state should have a method that checks if the game is over.
  isGameOver() {
    return this.grid.isGameOver();
  }
  // The game state should have a method that checks if the shape can move left.
  canMoveLeft() {
    return this.shape.canMoveLeft(this.grid);
  }
  // The game state should have a method that checks if the shape can move right.
  canMoveRight() {
    return this.shape.canMoveRight(this.grid);
  }
  // The game state should have a method that checks if the shape can move down.
  canMoveDown() {
    return this.shape.canMoveDown(this.grid);
  }
  // The game state should have a method that checks if the shape can rotate.
  canRotate() {
    return this.shape.canRotate(this.grid);
  }
  // The game state should have a method that moves the shape left.
  moveLeft() {
    this.shape.moveLeft();
  }
  // The game state should have a method that moves the shape right.
  moveRight() {
    this.shape.moveRight();
  }
  // The game state should have a method that moves the shape down.
  moveDown() {
    this.shape.moveDown();
  }
  // The game state should have a method that rotates the shape.
  rotate() {
    this.shape.rotate();
  }
  // The game state should have a method that places the shape on the grid.
  placeShape() {
    this.grid.placeShape(this.shape);
  }
  // The game state should have a method that clears all full rows.
  clearFullRows() {
    this.grid.clearFullRows();
  }
  // The game state should have a method that increases the score.
  increaseScore() {
    this.score.increaseScore(1);
  }
  // The game state should have a method that resets the score.
  resetScore() {
    this.score.resetScore();
  }
  // The game state should have a method that resets the game.
  resetGame() {
    this.grid.grid = this.grid.createGrid();
    this.shape = new LShape();
    this.score.resetScore();
  }
}
