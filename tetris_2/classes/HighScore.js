// Step 5. HighScore class.
export default class HighScore {
  // The high score should be a number.
  constructor() {
    this.highScore = 0;
  }

  // The high score should have a method that checks if the score is a high score. The parameter score is a number representing the score to check.
  /**
   *
   * @param {Number} score
   * @returns {Boolean}
   */
  isHighScore(score) {
    return score > this.highScore;
  }

  // The high score should have a method that updates the high score. The parameter score is a number representing the score to update.
  /**
   *
   * @param {Number} score
   */
  updateHighScore(score) {
    this.highScore = score;
  }
}
