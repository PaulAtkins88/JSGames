// tetris/datastore.js

const { S3 } = window.AWS;

// Configure AWS SDK
AWS.config.update({
  region: 'ap-southeast-2',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:8ea26655-f662-4e06-8a59-caf42ed6ed69'
  })
});

const s3 = new S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'atkins-tetris-game' }
});

// tetris/datastore.js

export async function saveHighScores(highScores) {
  const params = {
    Key: 'highScores.json',
    Body: JSON.stringify({ highScores })
  };
  let promise = s3.putObject(params).promise();
  promise
    .then(() => console.log('Saved high scores'))
    .catch((err) => console.error(err));
}

export async function getHighScores() {
  console.log('Getting high scores from S3');
  const params = {
    Key: 'highScores.json'
  };
  let promise = s3.getObject(params).promise();

  const highScores = promise
    .then((data) => {
      console.log('Got high scores from S3');
      const decoder = new TextDecoder('utf-8');
      const highScores = JSON.parse(decoder.decode(data.Body)).highScores;
      return highScores;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  return highScores;
}
