import * as d3 from 'd3';

export function runBFS(container) {
    const width = 800;
    const height = 600;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const nodes = [
        { id: 1, x: 100, y: 100 },
        { id: 2, x: 300, y: 100 },
        { id: 3, x: 500, y: 100 },
        { id: 4, x: 700, y: 100 },
        { id: 5, x: 300, y: 300 },
        { id: 6, x: 500, y: 300 },
    ];

    const links = [
        { source: 1, target: 2 },
        { source: 2, target: 3 },
        { source: 3, target: 4 },
        { source: 2, target: 5 },
        { source: 3, target: 6 },
    ];

    const link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', d => nodes[d.source - 1].x)
        .attr('y1', d => nodes[d.source - 1].y)
        .attr('x2', d => nodes[d.target - 1].x)
        .attr('y2', d => nodes[d.target - 1].y)
        .attr('stroke', '#999');

    const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 20)
        .attr('fill', '#69b3a2');

    // Função para animar a busca em largura (BFS)
    function animateBFS() {
        const queue = [nodes[0]];
        const visited = new Set();
        let index = 0;

        function step() {
            if (index < queue.length) {
                const node = queue[index++];
                if (!visited.has(node.id)) {
                    visited.add(node.id);
                    d3.selectAll('.node')
                        .filter(d => d.id === node.id)
                        .attr('fill', '#ff6347');

                    links.forEach(link => {
                        if (link.source === node.id && !visited.has(link.target)) {
                            queue.push(nodes[link.target - 1]);
                        }
                    });

                    setTimeout(step, 500);
                }
            }
        }

        step();
    }

    animateBFS();
}
