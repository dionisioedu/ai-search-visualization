export function visualizeAStar(ctx, cellSize) {
    const rows = 10;
    const cols = 10;
    const grid = createGrid(rows, cols);

    const start = [0, 0];
    const goal = [9, 9];

    drawGrid(ctx, cellSize, grid, start, goal);

    const openSet = new Set([start.toString()]);
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start, goal));

    async function aStar() {
        if (openSet.size === 0) {
            drawEmptyGrid(ctx, cellSize);
            return;
        }

        let current = [...openSet].reduce((a, b) =>
            fScore.get(a) < fScore.get(b) ? a : b
        );

        if (current === goal.toString()) {
            console.log(`Goal reached: ${goal}`);
            return;
        }

        openSet.delete(current);
        const [row, col] = current.split(',').map(Number);

        const neighbors = getNeighbors(row, col, rows, cols);

        for (const [nRow, nCol] of neighbors) {
            const neighborKey = [nRow, nCol].toString();
            const tentativeGScore = gScore.get(current) + 1;

            if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeGScore);
                fScore.set(neighborKey, tentativeGScore + heuristic([nRow, nCol], goal));
                if (!openSet.has(neighborKey)) {
                    openSet.add(neighborKey);
                    drawCell(ctx, cellSize, nRow, nCol, 'blue');

                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }

        requestAnimationFrame(aStar);
    }

    aStar();
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

function heuristic(node, goal) {
    return Math.abs(node[0] - goal[0]) + Math.abs(node[1] - goal[1]);
}

function drawGrid(ctx, cellSize, grid, start, goal) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            drawCell(ctx, cellSize, row, col, 'white');
        }
    }
    drawCell(ctx, cellSize, start[0], start[1], 'green');
    drawCell(ctx, cellSize, goal[0], goal[1], 'red');
}

function drawCell(ctx, cellSize, row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

function drawEmptyGrid(ctx, cellSize) {
    const rows = 10;
    const cols = 10;
    const grid = createGrid(rows, cols);
    const start = [0, 0];
    const goal = [9, 9];
    drawGrid(ctx, cellSize, grid, start, goal);
}