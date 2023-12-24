// snake.js
const canvas = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const context = canvas.getContext('2d');
const cellSize = 20; // Change this to the size you want

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  let widthToHeight = 4 / 3; // replace with your desired aspect ratio
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
    gameBoard.style.height = newHeight + 'px';
    gameBoard.style.width = newWidth + 'px';
  } else {
    newHeight = newWidth / widthToHeight;
    gameBoard.style.width = newWidth + 'px';
    gameBoard.style.height = newHeight + 'px';
  }

  gameBoard.width = newWidth;
  gameBoard.height = newHeight;
}

const eatSound = new Audio('eat.mp3');
const gameOverSound = new Audio('gameover.wav');
const apple = new Image();
apple.src = 'Graphics/apple.png';

const headImages = {
  up: new Image(),
  down: new Image(),
  left: new Image(),
  right: new Image()
};

headImages.up.src = 'Graphics/head_up.png';
headImages.down.src = 'Graphics/head_down.png';
headImages.left.src = 'Graphics/head_left.png';
headImages.right.src = 'Graphics/head_right.png';

const tailImages = {
  up: new Image(),
  down: new Image(),
  left: new Image(),
  right: new Image()
};

tailImages.up.src = 'Graphics/tail_up.png';
tailImages.down.src = 'Graphics/tail_down.png';
tailImages.left.src = 'Graphics/tail_left.png';
tailImages.right.src = 'Graphics/tail_right.png';

const bodyImages = {
  horizontal: new Image(),
  vertical: new Image(),
  bottom_left: new Image(),
  bottom_right: new Image(),
  top_left: new Image(),
  top_right: new Image()
};

bodyImages.horizontal.src = 'Graphics/body_horizontal.png';
bodyImages.vertical.src = 'Graphics/body_vertical.png';
bodyImages.bottom_left.src = 'Graphics/body_bottomleft.png';
bodyImages.bottom_right.src = 'Graphics/body_bottomright.png';
bodyImages.top_left.src = 'Graphics/body_topleft.png';
bodyImages.top_right.src = 'Graphics/body_topright.png';

function startGame() {
  if (
    !headImages.right.complete ||
    !tailImages.right.complete ||
    !bodyImages.horizontal.complete
  ) {
    return;
  }

  // All the images are loaded now
  // Start the game!
  gameLoop();
}

let score = 0;
let snake = [
  { x: 200, y: 200 },
  { x: 200 - cellSize, y: 200 },
  { x: 200 - 2 * cellSize, y: 200 },
  { x: 200 - 3 * cellSize, y: 200 },
  { x: 200 - 4 * cellSize, y: 200 }
];
let dx = cellSize;
let dy = 0;

let food = { x: getRandomFoodPosition(), y: getRandomFoodPosition() };

startButton.addEventListener('click', function () {
  // reset the game state
  score = 0;
  snake = [
    { x: 200, y: 200 },
    { x: 200 - cellSize, y: 200 },
    { x: 200 - 2 * cellSize, y: 200 },
    { x: 200 - 3 * cellSize, y: 200 },
    { x: 200 - 4 * cellSize, y: 200 }
  ];
  dx = cellSize;
  dy = 0;
  const foodPosition = getRandomFoodPosition();
  food = { x: foodPosition.x, y: foodPosition.y };
  gameLoop();
  startButton.disabled = true;
});

function getRandomFoodPosition() {
  let position;
  while (true) {
    position = {
      x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
      y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize
    };

    if (
      !snake.some(
        (snakePart) => snakePart.x === position.x && snakePart.y === position.y
      )
    ) {
      break;
    }
  }
  return position;
}

function drawFood() {
  context.drawImage(apple, food.x, food.y, cellSize, cellSize);
}

function getHeadImage() {
  if (dx === cellSize) return headImages.right;
  if (dx === -cellSize) return headImages.left;
  if (dy === cellSize) return headImages.down;
  if (dy === -cellSize) return headImages.up;
  return headImages.right; // default image
}
function getTailImage(snakePart, prevPart) {
  if (prevPart.x < snakePart.x) return tailImages.right;
  if (prevPart.x > snakePart.x) return tailImages.left;
  if (prevPart.y < snakePart.y) return tailImages.down;
  if (prevPart.y > snakePart.y) return tailImages.up;
  return tailImages.right; // default image
}

function getBodyImage(prevPart, nextPart) {
  if (prevPart.x === nextPart.x) return bodyImages.vertical;
  if (prevPart.y === nextPart.y) return bodyImages.horizontal;
  return bodyImages.horizontal; // default image
}

function drawSnakePart(snakePart, index) {
  let img;
  if (index === 0) {
    img = getHeadImage();
  } else if (index === snake.length - 1) {
    const prevPart = snake[index - 1];
    img = getTailImage(snakePart, prevPart);
  } else {
    const prevPart = snake[index - 1];
    const nextPart = snake[index + 1];
    img = getBodyImage(prevPart, nextPart);
  }

  const imgWidth = cellSize;
  const imgHeight = (img.naturalHeight / img.naturalWidth) * cellSize;
  context.drawImage(img, snakePart.x, snakePart.y, imgWidth, imgHeight);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function updateSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    eatSound.play();
    const foodPosition = getRandomFoodPosition();
    food = { x: foodPosition.x, y: foodPosition.y };
    if (score > Number(localStorage.getItem('highScore'))) {
      localStorage.setItem('highScore', score);
      // Update the high score in the table
      document.getElementById('high-score').innerText = score;
    }
  } else {
    snake.pop();
  }
  snake.unshift(head);
}

window.addEventListener('keydown', function (event) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (arrowKeys.includes(event.key)) {
    event.preventDefault();
  }
  changeDirection(event);
});

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -cellSize;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -cellSize;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = cellSize;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = cellSize;
  }
}

function gameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - cellSize;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - cellSize;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function gameOver() {
  gameOverSound.play();
  context.fillStyle = 'White';
  context.font = '50px Arial';
  context.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  startButton.disabled = false; // enable the start button
}

function drawScore() {
  context.fillStyle = 'white';
  context.font = '50px Arial';
  context.textAlign = 'center';
  context.fillText('Score: ' + score, canvas.width / 2, 50);
}

function gameLoop() {
  if (gameEnded()) {
    gameOver();
    return;
  }
  let delay = 100 - Math.floor(score / 10);
  delay = Math.max(delay, 50); // set a minimum delay of 50 milliseconds
  setTimeout(function onTick() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    updateSnake();
    gameLoop();
  }, delay);
}
// Call resizeCanvas once to set the initial size
resizeCanvas();
// gameLoop();
