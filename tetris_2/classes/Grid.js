export default class Grid {
  // set the cell size to 20 and make it private
  #cellSize = 20;

  // The grid should be a 2d array of 0s and 1s.
  // 0s represent empty spaces and 1s represent filled spaces.
  /**
   *
   * @param {Number} rows
   * @param {Number} cols
   */
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.shapes = [];
    this.grid = this.createGrid();
  }

  // The grid should have a method that creates a grid.
  createGrid() {
    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid.push([]);
      for (let j = 0; j < this.cols; j++) {
        grid[i].push(0);
      }
    }
    return grid;
  }

  /**
   * Adds a shape to the grid.
   * @param {Number} x the x coordinate
   * @param {Number} y the y coordinate
   * @param {Shape} shape the shape to add
   */
  addShape(x, y, shape) {
    this.shapes.push({ x, y, shape });
  }

  /**
   * Removes a shape from the grid.
   * @param {Shape} shape
   */
  removeShape(shape) {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  /**
   * Draws the grid lines.
   * @param {CanvasRenderingContext2D} context
   */
  drawGridLines(context) {
    context.strokeStyle = 'grey';
    for (let x = 0; x <= this.cols; x++) {
      context.moveTo(x * this.#cellSize, 0);
      context.lineTo(x * this.#cellSize, this.rows * this.#cellSize);
    }
    for (let y = 0; y <= this.rows; y++) {
      context.moveTo(0, y * this.#cellSize);
      context.lineTo(this.cols * this.#cellSize, y * this.#cellSize);
    }
    context.stroke();
  }

  drawShapesOnGrid(ctx) {
    this.shapes.forEach((shape) => {
      for (let i = 0; i < shape.shape.length; i++) {
        for (let j = 0; j < shape.shape[i].length; j++) {
          if (shape.shape[i][j] === 1) {
            ctx.fillStyle = shape.color;
            ctx.fillRect((shape.x + j) * 20, (shape.y + i) * 20, 20, 20);
          }
        }
      }
    });
  }

  /**
   * Shows the grid state.
   * @param {CanvasRenderingContext2D} ctx
   */
  showGridState(ctx) {
    this.drawGridLines(ctx);
    this.drawShapesOnGrid(ctx);
  }

  // The grid should have a method that checks if a shape can be placed on the grid. The parameter shape is an object representing the shape to check.
  /**
   * Checks if a shape can be placed on the grid.
   * @param {Shape} shape
   * @returns {Boolean}
   */
  canPlaceShape(shape) {
    for (let i = 0; i < shape.shape.length; i++) {
      for (let j = 0; j < shape.shape[i].length; j++) {
        if (
          shape.shape[i][j] === 1 &&
          this.grid[shape.y + i][shape.x + j] === 1
        ) {
          return false;
        }
      }
    }
    return true;
  }

  // The grid should have a method that places a shape on the grid. The parameter shape is an object representing the shape to place.
  /**
   * Places a shape on the grid.
   * @param {Shape} shape
   */
  placeShape(shape) {
    for (let i = 0; i < shape.shape.length; i++) {
      for (let j = 0; j < shape.shape[i].length; j++) {
        if (shape.shape[i][j] === 1) {
          this.grid[shape.y + i][shape.x + j] = 1;
        }
      }
    }
  }

  // The grid should have a method that checks if a row is full. using a for in loop to iterate over the grid. if the row is full, return true. else return false. the parameter row is a number representing the row to check.
  /**
   *
   * @param {Number} row
   * @returns {Boolean}
   */
  isRowFull(row) {
    for (let col = 0; col < this.grid[row].length; col++) {
      if (this.grid[row][col] === 0) {
        return false;
      }
    }
    return true;
  }

  // The grid should have a method that clears a row. The parameter row is a number representing the row to clear.
  /**
   * Clears a row.
   * @param {Number} row
   */
  clearRow(row) {
    for (let col = 0; col < this.grid[row].length; col++) {
      this.grid[row][col] = 0;
    }
  }

  // The grid should have a method that clears all full rows.
  clearFullRows() {
    for (let row = 0; row < this.grid.length; row++) {
      if (this.isRowFull(row)) {
        this.clearRow(row);
      }
    }
  }

  // The grid should have a method that checks if the game is over. A game is over if the top row has a 1.
  isGameOver() {
    return this.grid[0].includes(1);
  }
}
