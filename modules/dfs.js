// src/dfs.js
export function visualizeDFS(ctx) {
    const rows = 10;
    const cols = 10;
    const grid = createGrid(rows, cols);

    const start = [0, 0];
    const goal = [9, 9];

    drawGrid(ctx, grid, start, goal);

    const stack = [start];
    const visited = new Set();
    visited.add(start.toString());

    function dfs() {
        if (stack.length === 0) {
            drawEmptyGrid(ctx);
            return;
        }

        const [row, col] = stack.pop();

        if (row === goal[0] && col === goal[1]) {
            return;
        }

        const neighbors = getNeighbors(row, col, rows, cols);

        for (const [nRow, nCol] of neighbors) {
            const neighborKey = [nRow, nCol].toString();

            if (!visited.has(neighborKey)) {
                stack.push([nRow, nCol]);
                visited.add(neighborKey);
                drawCell(ctx, nRow, nCol, 'blue');
            }
        }

        requestAnimationFrame(dfs);
    }

    dfs();
}

function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function getNeighbors(row, col, rows, cols) {
    const neighbors = [];
    if (row > 0) neighbors.push([row - 1, col]);
    if (row < rows - 1) neighbors.push([row + 1, col]);
    if (col > 0) neighbors.push([row, col - 1]);
    if (col < cols - 1) neighbors.push([row, col + 1]);
    return neighbors;
}

function drawGrid(ctx, grid, start, goal) {
    const cellSize = 60;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            drawCell(ctx, row, col, 'white');
        }
    }
    drawCell(ctx, start[0], start[1], 'green');
    drawCell(ctx, goal[0], goal[1], 'red');
}

function drawCell(ctx, row, col, color) {
    const cellSize = 60;
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

function drawEmptyGrid(ctx) {
    const rows = 10;
    const cols = 10;
    const grid = createGrid(rows, cols);
    const start = [0, 0];
    const goal = [9, 9];
    drawGrid(ctx, grid, start, goal);
}