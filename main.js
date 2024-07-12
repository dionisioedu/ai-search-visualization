import { visualizeBFS } from "./modules/bfs.js";
import { visualizeDFS } from "./modules/dfs.js";
import { visualizeAStar } from "./modules/astar.js";

const canvas = document.getElementById("visualizationCanvas");
const ctx = canvas.getContext("2d");

document.getElementById("startBFS").addEventListener("click", () => {
  visualizeBFS(ctx);
});

document.getElementById("startDFS").addEventListener("click", () => {
  visualizeDFS(ctx);
});

document.getElementById("startAStar").addEventListener("click", () => {
  visualizeAStar(ctx);
});