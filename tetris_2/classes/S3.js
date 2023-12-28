// Step 6. S3 class.
export default class S3 {
  // get S3 Object from AWS SDK which has been loaded in the HTML file.
  constructor() {
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: 'atkins-tetris-game' }
    });
  }

  // The s3 should have a method that gets the high score.
  getHighScore() {
    console.log('Getting high score from S3');
    const params = {
      Key: 'highScore.json'
    };
    let promise = this.s3.getObject(params).promise();

    const highScore = promise
      .then((data) => {
        console.log('Got high score from S3');
        const decoder = new TextDecoder('utf-8');
        const highScore = JSON.parse(decoder.decode(data.Body)).highScore;
        return highScore;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    return highScore;
  }

  // The s3 should have a method that sets the high score. The parameter highScore is a number representing the high score to set.
  /**
   *
   * @param {Number} highScore
   */
  setHighScore(highScore) {
    const params = {
      Key: 'highScore.json',
      Body: JSON.stringify({ highScore })
    };
    let promise = this.s3.putObject(params).promise();
    promise
      .then(() => console.log('Saved high score'))
      .catch((err) => console.error(err));
  }
}
