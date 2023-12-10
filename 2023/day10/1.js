const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    var mapping = {
        '|': [
            [1, 0],
            [-1, 0],
        ],
        '-': [
            [0, -1],
            [0, 1],
        ],
        L: [
            [-1, 0],
            [0, 1],
        ],
        J: [
            [0, -1],
            [-1, 0],
        ],
        7: [
            [0, -1],
            [1, 0],
        ],
        F: [
            [0, 1],
            [1, 0],
        ],
        '.': [
            [0, 0],
            [0, 0],
        ],
    };

    var m = data.length;
    var n = data[0].length;
    var q = [];
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === 'S') {
                q.push([i, j]);
                break;
            }
        }
    }

    var result = 0;

    var visited = new Set();
    while (q.length) {
        var newQ = [];
        result++;

        for (var [x, y] of q) {
            if (visited.has(x * n + y)) continue;
            visited.add(x * n + y);
            data[x][y] = '#';

            for (var [dx, dy] of dirs) {
                var x0 = x + dx;
                var y0 = y + dy;

                if (
                    mapping[data[x0]?.[y0]]?.some(([dxt, dyt]) => {
                        var x0t = x0 + dxt;
                        var y0t = y0 + dyt;

                        return x0t === x && y0t === y;
                    })
                ) {
                    newQ.push([x0, y0]);
                }
            }
        }

        q = newQ;
    }

    console.timeEnd();
    console.log(result - 1);
})(process.argv[1]);
