const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 25;  // Set default grid size to 25
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let hourPos = { x: getRandomGridPosition(gridWidth), y: getRandomGridPosition(gridHeight) };
let minutePos = { x: getRandomGridPosition(gridWidth), y: getRandomGridPosition(gridHeight) };
let secondPos = { x: getRandomGridPosition(gridWidth), y: getRandomGridPosition(gridHeight) };

let hourPath = [hourPos];
let minutePath = [minutePos];
let secondPath = [secondPos];

// Function to get a random valid grid position
function getRandomGridPosition(max) {
    return Math.floor(Math.random() * (max - 2)) + 1;
}


// Define possible moves for each dot
// const hourMoves = [
//     { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
// ];
// const minuteMoves = [
//     { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
// ];
const hourMoves = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }
];
const minuteMoves = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }
];
const secondMoves = [
    { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }
];

// Function to check if a position is already in the path
function isInPath(path, pos) {
    return path.some(p => p.x === pos.x && p.y === pos.y);
}

// Function to get the new valid position for a dot
function getNewPosition(dotType, currentPosition, path) {
    const moves = dotType === 'hour' ? hourMoves :
                  dotType === 'minute' ? minuteMoves : secondMoves;

    // Shuffle moves to ensure randomness
    const shuffledMoves = moves.sort(() => Math.random() - 0.5);

    for (const move of shuffledMoves) {
        const newPos = { x: currentPosition.x + move.x, y: currentPosition.y + move.y };
        if (newPos.x > 0 && newPos.x < gridWidth && newPos.y > 0 && newPos.y < gridHeight && !isInPath(path, newPos)) {
            return newPos;
        }
    }

    // If no valid move found, allow move to a repeated position
    for (const move of moves) {
        const newPos = { x: currentPosition.x + move.x, y: currentPosition.y + move.y };
        if (newPos.x > 0 && newPos.x < gridWidth && newPos.y > 0 && newPos.y < gridHeight) {
            return newPos;
        }
    }
    const move = moves[0];
    return { x: currentPosition.x + move.x, y: currentPosition.y + move.y };
}

function drawPath(ctx, path, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(path[0].x * gridSize, path[0].y * gridSize);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x * gridSize, path[i].y * gridSize);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawDot(ctx, pos, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(pos.x * gridSize, pos.y * gridSize, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawPaths() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    // Draw paths
    drawPath(ctx, hourPath, 'black');
    drawPath(ctx, minutePath, 'rgb(77,77,77)');
    drawPath(ctx, secondPath, 'rgb(153,153,153)');

    // Draw dots
    drawDot(ctx, hourPos, 'black');
    drawDot(ctx, minutePos, 'rgb(77,77,77)');
    drawDot(ctx, secondPos, 'rgb(153,153,153)');
}

function drawGrid() {
    for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
}

function updateHour() {
    const newHourPos = getNewPosition('hour', hourPos, hourPath);
    hourPath.push(newHourPos);
    if (hourPath.length > 24) hourPath.shift();
    hourPos = newHourPos;
}

function updateMinute() {
    
    const newMinutePos = getNewPosition('minute', minutePos, minutePath);
    minutePath.push(newMinutePos);
    if (minutePath.length > 60) minutePath.shift();
    minutePos = newMinutePos;
}

function updateSecond() {
    const newSecondPos = getNewPosition('second', secondPos, secondPath);
    secondPath.push(newSecondPos);
    if (secondPath.length > 60) secondPath.shift();
    secondPos = newSecondPos;
}

function updatePaths() {
    const now = new Date();
    if (now.getSeconds() === 0) {
        // secondPath = [secondPath[secondPath.length - 1]]; // reset second path
        updateMinute();
        if (now.getMinutes() === 0) {
            minutePath = [minutePath[minutePath.length - 1]]; // reset minute path
            if (now.getHours() === 0) {
                hourPath = [hourPath[hourPath.length - 1]]; // reset hour path
            }
            updateHour();
        }
    }
    updateSecond();
    drawPaths();
}

function initializePaths() {
    const now = new Date();
    for (let i = 0; i < now.getHours(); i++) updateHour();
    for (let i = 0; i < now.getMinutes(); i++) updateMinute();
    for (let i = 0; i < now.getSeconds(); i++) updateSecond();
}

function updatePage() {
    updatePaths();
    updateClock();
}

const hourDiv = document.getElementById('hour');
const minuteDiv = document.getElementById('minute');
const secondDiv = document.getElementById('second');

function updateClock(){
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    hourDiv.innerText = hour < 10 ? '0' + hour : hour;
    minuteDiv.innerText = minute < 10 ? '0' + minute : minute;
    secondDiv.innerText = second < 10 ? '0' + second : second;
}

initializePaths();
setInterval(updatePage, 1000);

drawPaths();
