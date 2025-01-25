const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = undefined;
    console.time(COMPLEXITY);

    let MIN = Infinity;
    let MAX = -Infinity;
    var squarePositions = new Set(data);
    for (let cube of squarePositions) {
        let [x, y, z] = cube.split(',').map(n => parseInt(n));
        MIN = Math.min(MIN, x, y, z);
        MAX = Math.max(MAX, x, y, z);
    }

    const countAffectedCubes = (x, y, z) => {
        let count = 0;
        if (squarePositions.has(`${x + 1},${y},${z}`)) count++;
        if (squarePositions.has(`${x - 1},${y},${z}`)) count++;
        if (squarePositions.has(`${x},${y + 1},${z}`)) count++;
        if (squarePositions.has(`${x},${y - 1},${z}`)) count++;
        if (squarePositions.has(`${x},${y},${z + 1}`)) count++;
        if (squarePositions.has(`${x},${y},${z - 1}`)) count++;

        return count;
    };

    let visited = new Set();

    let surfaceArea = 0;
    let queue = [{ x: 0, y: 0, z: 0 }];

    while (queue.length > 0) {
        let { x, y, z } = queue.shift();
        if (visited.has(`${x},${y},${z}`)) continue;
        if (squarePositions.has(`${x},${y},${z}`)) continue;
        if (x < MIN - 1 || y < MIN - 1 || z < MIN - 1) continue;
        if (x > MAX + 1 || y > MAX + 1 || z > MAX + 1) continue;
        visited.add(`${x},${y},${z}`);

        surfaceArea += countAffectedCubes(x, y, z);

        queue.push({ x: x + 1, y, z });
        queue.push({ x: x - 1, y, z });
        queue.push({ x, y: y + 1, z });
        queue.push({ x, y: y - 1, z });
        queue.push({ x, y, z: z + 1 });
        queue.push({ x, y, z: z - 1 });
    }

    console.log(surfaceArea);
    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
