// #region Shape
// Step 2. Shape class. Should be an abstract class. Should not be instantiated. Should be extended by the other shape classes.
export default class Shape {
  // protected color variable
  color = 'black';
  // The shape should be a 2d array of 0s and 1s.
  // 0s represent empty spaces and 1s represent filled spaces.
  // Example usage:
  /*
  class LShape extends Shape {
    constructor() {
      super();
      this.shape = [
        [1, 0],
        [1, 0],
        [1, 1],
      ];
    }
  }
 
  const lShape = new LShape();
  */
  constructor() {
    if (this.constructor === Shape) {
      throw new Error('Shape is an abstract class and cannot be instantiated.');
    }
  }

  /**
   * Checks if the shape can move to the new x and y coordinates.
   * @param {Number} newX
   * @param {Number} newY
   * @param {Grid} grid
   */
  canMoveTo(newX, newY, grid) {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        // Check if the cell is empty
        if (!this.shape[y][x]) {
          continue;
        }

        // Check if the new position is outside the grid
        if (
          newX + x < 0 ||
          newX + x >= grid.cols ||
          newY + y < 0 ||
          newY + y >= grid.rows
        ) {
          return false;
        }

        // Check if the new position overlaps with an existing shape
        if (grid.grid[newY + y] && grid.grid[newY + y][newX + x]) {
          return false;
        }
      }
    }

    return true;
  }

  // Should have a method that checks if the shape can move left. The parameter grid is an object representing the grid to check as there may be a shape on the grid.
  /**
   *
   * @param {Grid} grid
   * @returns {Boolean}
   */
  canMoveLeft(grid) {
    return this.canMoveTo(this.x - 1, this.y, grid);
  }

  // Should have a method that checks if the shape can move right.
  /**
   *
   * @param {Grid} grid
   * @returns {Boolean}
   */
  canMoveRight(grid) {
    return this.canMoveTo(this.x + 1, this.y, grid);
  }

  // Should have a method that checks if the shape can move down.
  /**
   *
   * @param {Grid} grid
   * @returns {Boolean}
   */
  canMoveDown(grid) {
    return this.canMoveTo(this.x, this.y + 1, grid);
  }

  // Should have a method that checks if the shape can rotate.
  canRotate(grid) {
    const newShape = [];
    for (let i = 0; i < this.shape[0].length; i++) {
      newShape.push([]);
      for (let j = this.shape.length - 1; j >= 0; j--) {
        newShape[i].push(this.shape[j][i]);
      }
    }
    return (
      this.x + newShape[0].length < grid.cols &&
      this.y + newShape.length < grid.rows
    );
  }

  // Should have a method that rotates the shape.
  rotate() {
    const newShape = [];
    for (let i = 0; i < this.shape[0].length; i++) {
      newShape.push([]);
      for (let j = this.shape.length - 1; j >= 0; j--) {
        newShape[i].push(this.shape[j][i]);
      }
    }
    this.shape = newShape;
  }

  // Should have a method that moves the shape left.
  moveLeft() {
    this.x--;
  }
  // Should have a method that moves the shape right.
  moveRight() {
    this.x++;
  }
  // Should have a method that moves the shape down.
  moveDown() {
    this.y++;
  }
}
// Step 2.a Shape subclasses. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
// Step 2.a.1 LShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class LShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [1, 0],
      [1, 0],
      [1, 1]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'red';
  }
}
// Step 2.a.2 JShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class JShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [0, 1],
      [0, 1],
      [1, 1]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'blue';
  }
}
// Step 2.a.3 TShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class TShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [1, 1, 1],
      [0, 1, 0]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'green';
  }
}
// Step 2.a.4 OShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class OShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [1, 1],
      [1, 1]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'yellow';
  }
}
// Step 2.a.5 IShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class IShape extends Shape {
  constructor() {
    super();
    this.shape = [[1], [1], [1], [1]];
    this.x = 0;
    this.y = 0;
    this.color = 'purple';
  }
}
// Step 2.a.6 SShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class SShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [0, 1, 1],
      [1, 1, 0]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'orange';
  }
}
// Step 2.a.7 ZShape class. Should extend the Shape class. Should be instantiated. Should not be abstract classes.
export class ZShape extends Shape {
  constructor() {
    super();
    this.shape = [
      [1, 1, 0],
      [0, 1, 1]
    ];
    this.x = 0;
    this.y = 0;
    this.color = 'pink';
  }
}
