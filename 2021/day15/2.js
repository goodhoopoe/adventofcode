const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    const matrix = data
        .split(utils.LINE_BREAK)
        .map(line => line.split('').map(el => +el));

    let m = matrix.length;
    let n = matrix[0].length;

    const bigMatrix = [];
    for (let i = 0; i < m * 5; i++) {
        bigMatrix.push(Array(n * 5).fill(undefined));
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let i0 = 0; i0 < m; i0++) {
                for (let j0 = 0; j0 < n; j0++) {
                    let value = matrix[i0][j0] + i + j;
                    value = value > 9 ? value % 9 : value;

                    bigMatrix[i * m + i0][j * n + j0] = value;
                }
            }
        }
    }

    const dirs = [
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 0],
    ];

    const grid = [];

    for (let i = 0; i < m * 5; i++) {
        grid.push(Array(n * 5).fill(+Infinity));
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
                    x0 < m * 5 &&
                    y0 < n * 5 &&
                    grid[x0][y0] > grid[x][y] + bigMatrix[x0][y0]
                ) {
                    newQ.push([x0, y0]);
                    grid[x0][y0] = Math.min(
                        grid[x0][y0],
                        grid[x][y] + bigMatrix[x0][y0]
                    );
                }
            });
        }
        q = newQ;
    }

    const result = grid[m * 5 - 1][n * 5 - 1];

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
