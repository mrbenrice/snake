loadSnake(); 
function loadSnake() {
const gameBoard = document.querySelector('#gameBoard')
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('.scoreText')
const resetButton = document.querySelector('#resetButton')
const easyButton = document.querySelector('#easyModeButton')
const mediumButton = document.querySelector('#medModeButton')
const hardButton = document.querySelector('#hardModeButton')
const expertButton = document.querySelector('#expModeButton')
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'white'
const snakeColor = 'green'
const snakeBorder = 'black'
const snakeFood = 'red'
const unitSize = 20
let tickLength = 75
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0
let snake = [
    {x: unitSize*3, y: 0},
    {x: unitSize*2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
]

window.addEventListener('keydown', changeDirection);
easyButton.addEventListener('click', easyMode, gameStart)
easyButton.addEventListener('click', () => {
    console.log(unitSize)
    console.log(tickLength)
    console.log(snake)
})
mediumButton.addEventListener('click', mediumMode, gameStart);
hardButton.addEventListener('click', hardMode, gameStart);
expertButton.addEventListener('click', expertMode, gameStart)


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
    easyButton.style.visibility = 'hidden'
    mediumButton.style.visibility = 'hidden'
    hardButton.style.visibility = 'hidden'
    expertButton.style.visibility = 'hidden'
};

function nextTick(){
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, tickLength)
    } else {
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameHeight - unitSize)
};

function drawFood(){
    ctx.fillStyle = snakeFood;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity}

    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score+=1
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};

function changeDirection(event){
    const keyPressed = event.keyCode
    console.log(event.keyCode)
    const LEFT = 37;
    const aLEFT = 65
    const UP = 38;
    const wUP = 87
    const RIGHT = 39;
    const dRIGHT = 68
    const DOWN = 40;
    const sDOWN = 83

    const goingUP = (yVelocity == -unitSize);
    const goingDOWN = (yVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);
    const goingRIGHT = (xVelocity == unitSize);

    switch(true) {
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize
            yVelocity = 0
            break;
        case(keyPressed == UP && !goingDOWN):
            xVelocity = 0
            yVelocity = -unitSize
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize
            yVelocity = 0
            break;
        case(keyPressed == DOWN && !goingUP):
            xVelocity = 0
            yVelocity = unitSize
            break;
            case(keyPressed == aLEFT && !goingRIGHT):
            xVelocity = -unitSize
            yVelocity = 0
            break;
        case(keyPressed == wUP && !goingDOWN):
            xVelocity = 0
            yVelocity = -unitSize
            break;
        case(keyPressed == dRIGHT && !goingLEFT):
            xVelocity = unitSize
            yVelocity = 0
            break;
        case(keyPressed == sDOWN && !goingUP):
            xVelocity = 0
            yVelocity = unitSize
            break;
    }
};

function checkGameOver(){
    switch(true) {
        case (snake[0].x < 0):
            running= false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game over!", gameWidth / 2, gameHeight / 2);
    running = false;
    easyButton.style.visibility = 'visible'
    mediumButton.style.visibility = 'visible'
    hardButton.style.visibility = 'visible'
    expertButton.style.visibility = 'visible'
};

function resetGame(){
    running == false;
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0
    snake = [
        {x: unitSize*3, y: 0},
        {x: unitSize*2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart();
};

function easyMode() {
    resetGame();
    tickLength = 250
}
function mediumMode() {
    resetGame();
    tickLength = 175
}
function hardMode() {
    resetGame();
    tickLength = 100
}
function expertMode() {
    resetGame();
    tickLength = 50
}
}