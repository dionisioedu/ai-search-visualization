import { visualizeBFS } from "./modules/bfs.js";
import { visualizeDFS } from "./modules/dfs.js";
import { visualizeAStar } from "./modules/astar.js";

const canvas = document.getElementById("visualizationCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    drawEmptyGrid(ctx);
}

function drawEmptyGrid(ctx) {
    const rows = 10;
    const cols = 10;
    const grid = createGrid(rows, cols);
    const start = [0, 0];
    const goal = [9, 9];
    drawGrid(ctx, grid, start, goal);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.getElementById("startBFS").addEventListener("click", () => {
  visualizeBFS(ctx);
});

document.getElementById("startDFS").addEventListener("click", () => {
  visualizeDFS(ctx);
});

document.getElementById("startAStar").addEventListener("click", () => {
  visualizeAStar(ctx);
});

document.getElementById("clearGrid").addEventListener("click", () => {
  drawEmptyGrid(ctx);
});

function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
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