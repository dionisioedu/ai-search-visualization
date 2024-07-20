import { visualizeBFS } from "./modules/bfs.js";
import { visualizeDFS } from "./modules/dfs.js";
import { visualizeAStar } from "./modules/astar.js";

const canvas = document.getElementById("visualizationCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.clientWidth / 10;
const cols = 10;
const rows = 10;
const walls = fillWalls(cols, rows);

function resizeCanvas() {
    const parentElement = canvas;
    canvas.width = parentElement.clientWidth;
    canvas.height = canvas.width; // Ajuste a altura aqui conforme necessário
    drawEmptyGrid(ctx);
}

function drawEmptyGrid(ctx) {
    const grid = createGrid(rows, cols);
    const start = [0, 0];
    const goal = [9, 9];

    drawGrid(ctx, grid, walls, start, goal);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.getElementById("startBFS").addEventListener("click", () => {
  visualizeBFS(ctx, walls, cellSize);
});

document.getElementById("startDFS").addEventListener("click", () => {
  visualizeDFS(ctx, walls, cellSize);
});

document.getElementById("startAStar").addEventListener("click", () => {
  visualizeAStar(ctx, walls, cellSize);
});

document.getElementById("clearGrid").addEventListener("click", () => {
  drawEmptyGrid(ctx);
});

function createGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function drawGrid(ctx, grid, walls, start, goal) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          const color = walls[row][col] === 1 ? 'black' : 'white';
            drawCell(ctx, row, col, color);
        }
    }

    drawCell(ctx, start[0], start[1], 'green');
    drawCell(ctx, goal[0], goal[1], 'red');
}

function drawCell(ctx, row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

function fillWalls(cols, rows) {
   const walls = Array.from({ length: rows }, () => Array(cols).fill(0));
  
    walls[0][3] = 1;
    walls[1][1] = 1;
    walls[1][2] = 1;
    walls[1][3] = 1;
    walls[1][4] = 1;
    walls[1][5] = 1;
    walls[1][6] = 1;
    walls[1][7] = 1;
    walls[1][8] = 1;
    walls[2][3] = 1;
    walls[2][8] = 1;
    walls[3][0] = 1;
    walls[3][1] = 1;
    walls[3][3] = 1;
    walls[3][4] = 1;
    walls[3][5] = 1;
    walls[3][6] = 1;
    walls[3][8] = 1;
    walls[4][1] = 1;
    walls[4][3] = 1;
    walls[5][1] = 1;
    walls[5][3] = 1;
    walls[5][4] = 1;
    walls[5][5] = 1;
    walls[5][6] = 1;
    walls[5][7] = 1;
    walls[5][9] = 1;
    walls[6][9] = 1;
    walls[7][0] = 1;
    walls[7][1] = 1;
    walls[7][2] = 1;
    walls[7][3] = 1;
    walls[7][4] = 1;
    walls[7][6] = 1;
    walls[7][7] = 1;
    walls[7][8] = 1;
    walls[7][9] = 1;
    walls[8][6] = 1;
    walls[9][0] = 1;
    walls[9][1] = 1;
    walls[9][2] = 1;
    walls[9][3] = 1;
    walls[9][4] = 1;
    walls[9][8] = 1;

    return walls;
}