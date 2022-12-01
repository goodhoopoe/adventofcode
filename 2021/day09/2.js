const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(N)');
    data = data
        .split(utils.LINE_BREAK)
        .map(row => row.split('').map(el => +el));
    let result = [];
    let cache = new Set();
    const m = data.length;
    const n = data[0].length;

    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n - 1; j++) {
            if (data[i][j] === 9) continue;
            if (cache.has(i * n + j)) continue;
            let sum = 0;
            let q = [[i, j]];

            while (q.length) {
                const newQ = [];
                for (let k = 0; k < q.length; k++) {
                    const [x, y] = q[k];
                    sum++;
                    cache.add(x * n + y);

                    dirs.forEach(([dx, dy]) => {
                        const x0 = x + dx;
                        const y0 = y + dy;

                        if (
                            x0 >= 0 &&
                            x0 < m &&
                            y0 >= 0 &&
                            y0 < n &&
                            !cache.has(x0 * n + y0) &&
                            data[x0][y0] !== 9
                        ) {
                            cache.add(x0 * n + y0);
                            newQ.push([x0, y0]);
                        }
                    });
                }
                q = newQ;
            }

            result.push(sum);
        }
    }
    result.sort((a, b) => b - a);

    console.timeEnd('O(N)');
    console.log(result[0] * result[1] * result[2]);
})(process.argv[1]);
