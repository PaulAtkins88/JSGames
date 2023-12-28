//#endregion
// Step 3. Score class.
export default class Score {
  // The score should be a number.
  constructor() {
    this.score = 0;
  }

  // The score should have a method that increases the score. The parameter score is a number representing the score to increase by.
  /**
   * Increases the score.
   * @param {Number} score
   */
  increaseScore(score) {
    this.score += score;
  }

  // The score should have a method that resets the score.
  resetScore() {
    this.score = 0;
  }
}
