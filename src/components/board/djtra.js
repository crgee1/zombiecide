const problem = {
    start: { A: 5, B: 2 },
    A: { C: 4, D: 2 },
    B: { A: 8, D: 7 },
    C: { D: 6, finish: 3 },
    D: { finish: 1 },
    finish: {}
};

const shortestCostNode = (distances, visited) => {
    return Object.keys(distances).reduce((shortest, node) => {
        if (shortest === null || distances[node] < distances[shortest]) {
            if (!visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    }, null);
};

// function that returns the minimum distance and path to reach Finish
const dijkstra = (graph) => {

    // track shortest distance to reach each node
    const distances = Object.assign({ finish: Infinity }, graph.start);

    // track paths
    const parents = { finish: null };
    for (let child in graph.start) {
        parents[child] = 'start';
    }

    // track nodes that have already been visited
    const visited = [];

    let node = shortestCostNode(distances, visited);

    while (node) {
        let distance = distances[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = distance + children[n];
            if (!distances[n]) {
                distances[n] = newCost;
                parents[n] = node;
            }
            if (distances[n] > newCost) {
                distances[n] = newCost;
                parents[n] = node;
            }
        }
        visited.push(node);
        node = shortestCostNode(distances, visited);
    }

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distances: distances.finish,
        path: optimalPath
    };

    return results;
}

console.log(dijkstra(problem))