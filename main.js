import { visualizeBFS } from './modules/bfs.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('visualizationCanvas');
    const ctx = canvas.getContext('2d');

    visualizeBFS(ctx);
});