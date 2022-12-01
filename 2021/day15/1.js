const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    const matrix = data
        .split(utils.LINE_BREAK)
        .map(line => line.split('').map(el => +el));

    const m = matrix.length;
    const n = matrix[0].length;

    const dirs = [
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 0],
    ];

    const grid = [];

    for (let i = 0; i < m; i++) {
        grid.push(Array(n).fill(+Infinity));
    }

    grid[0][0] = 0;

    let q = [[0, 0]];

    while (q.length) {
        let newQ = [];

        for (let [x, y] of q) {
            dirs.forEach(([dx, dy]) => {
                const x0 = x + dx;
                const y0 = y + dy;

                if (
                    x0 >= 0 &&
                    y0 >= 0 &&
                    x0 < m &&
                    y0 < n &&
                    grid[x0][y0] > grid[x][y] + matrix[x0][y0]
                ) {
                    newQ.push([x0, y0]);
                    grid[x0][y0] = Math.min(
                        grid[x0][y0],
                        grid[x][y] + matrix[x0][y0]
                    );
                }
            });
        }
        q = newQ;
    }

    const result = grid[m - 1][n - 1];

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
