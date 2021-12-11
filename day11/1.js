const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time('');
    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split('').map(el => +el));
    const dirs = [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
    ];

    let result = 0;

    const m = data.length;
    const n = data[0].length;
    let q = [];

    for (let w = 0; w < 100; w++) {
        const cache = new Set();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                data[i][j] = (data[i][j] + 1) % 10;
                if (data[i][j] === 0) {
                    cache.add(i * n + j);
                    q.push([i, j]);
                }
            }
        }

        while (q.length) {
            let newQ = [];

            for (const [x, y] of q) {
                result++;

                dirs.forEach(([dx, dy]) => {
                    const x0 = x + dx;
                    const y0 = y + dy;
                    if (
                        cache.has(x0 * n + y0) ||
                        x0 < 0 ||
                        y0 < 0 ||
                        x0 === m ||
                        y0 === n
                    )
                        return;
                    data[x0][y0] = (data[x0][y0] + 1) % 10;
                    if (data[x0][y0] === 0) {
                        cache.add(x0 * n + y0);
                        newQ.push([x0, y0]);
                    }
                });
            }

            q = newQ;
        }
    }

    console.timeEnd('');
    console.log(result);
})(process.argv[1]);
