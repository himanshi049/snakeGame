const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop;

const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameStatus = document.getElementById('gameStatus');

highScoreElement.textContent = highScore;

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', changeDirection);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startBtn.disabled = true;
        gameStatus.textContent = 'Game Running! Use Arrow Keys to move.';
        gameStatus.style.color = '#4CAF50';
        gameLoop = setInterval(update, 200);
    }
}

function resetGame() {
    clearInterval(gameLoop);
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameRunning = false;
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';
    gameStatus.textContent = 'Click "Start Game" to begin!';
    gameStatus.style.color = '#667eea';
    drawGame();
}
function changeDirection(event) {
    if (!gameRunning) return;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    let directionChanged = false;

    if (event.key === 'ArrowLeft' && !goingRight) {
        dx = -1;
        dy = 0;
        directionChanged = true;
    } else if (event.key === 'ArrowUp' && !goingDown) {
        dx = 0;
        dy = -1;
        directionChanged = true;
    } else if (event.key === 'ArrowRight' && !goingLeft) {
        dx = 1;
        dy = 0;
        directionChanged = true;
    } else if (event.key === 'ArrowDown' && !goingUp) {
        dx = 0;
        dy = 1;
        directionChanged = true;
    }
    else if (event.keyCode === 37 && !goingRight) {
        dx = -1;
        dy = 0;
        directionChanged = true;
    } else if (event.keyCode === 38 && !goingDown) {
        dx = 0;
        dy = -1;
        directionChanged = true;
    } else if (event.keyCode === 39 && !goingLeft) {
        dx = 1;
        dy = 0;
        directionChanged = true;
    } else if (event.keyCode === 40 && !goingUp) {
        dx = 0;
        dy = 1;
        directionChanged = true;
    }

    if (directionChanged) {
        event.preventDefault();
    }
}


function generateFood() {
    let newFood;
    let isOnSnake;
    
    do {
        isOnSnake = false;
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);
    
    return newFood;
}

function update() {
    if (dx === 0 && dy === 0) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        food = generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}
