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