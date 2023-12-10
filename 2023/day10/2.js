const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var m = data.length;
    var n = data[0].length;
    var zoom = [];
    for (var i = 0; i < m * 2; i++) {
        zoom.push(Array(n * 2).fill(0));
    }

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            zoom[i * 2][j * 2] = data[i][j];
            zoom[i * 2 + 1][j * 2 + 1] = '.';

            if (
                ['-', 'L', 'F'].includes(data[i][j]) &&
                ['-', 'J', '7'].includes(data[i][j + 1])
            ) {
                zoom[i * 2][j * 2 + 1] = '-';
            } else {
                zoom[i * 2][j * 2 + 1] = '.';
            }

            if (
                ['|', 'F', '7'].includes(data[i][j]) &&
                ['|', 'J', 'L'].includes(data[i + 1]?.[j])
            ) {
                zoom[i * 2 + 1][j * 2] = '|';
            } else {
                zoom[i * 2 + 1][j * 2] = '.';
            }
        }
    }

    data = zoom;
    m *= 2;
    n *= 2;

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

    var q = [];
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === 'S') {
                q.push([i, j]);

                if (['|', 'J', 'L'].includes(data[i + 2]?.[j])) {
                    data[i + 1][j] = '|';
                }
                if (['|', 'F', '7'].includes(data[i - 2]?.[j])) {
                    data[i - 1] = '|';
                }

                if (['-', 'J', '7'].includes(data[i]?.[j + 2])) {
                    data[i][j + 1] = '-';
                }
                if (['-', 'L', 'F'].includes(data[i]?.[j - 2])) {
                    data[i][j - 1] = '-';
                }

                break;
            }
        }
    }

    var visited = new Set();
    while (q.length) {
        var newQ = [];

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

    var q = [];
    q.push(
        ...Array(m)
            .fill(0)
            .map((_, i) => [i, 0])
    );
    q.push(
        ...Array(m)
            .fill(0)
            .map((_, i) => [i, n - 1])
    );
    q.push(
        ...Array(n)
            .fill(0)
            .map((_, i) => [0, i])
    );
    q.push(
        ...Array(n)
            .fill(0)
            .map((_, i) => [m - 1, i])
    );

    while (q.length) {
        var newQ = [];

        for (var [x, y] of q) {
            if (visited.has(x * n + y)) continue;
            visited.add(x * n + y);
            data[x][y] = 'O';

            for (var [dx, dy] of dirs) {
                var x0 = x + dx;
                var y0 = y + dy;

                if (
                    x0 >= 0 &&
                    x0 < m &&
                    y0 >= 0 &&
                    y0 < n &&
                    !visited.has(x0 * n + y0)
                ) {
                    newQ.push([x0, y0]);
                }
            }
        }

        q = newQ;
    }
    var result = 0;

    for (var i = 0; i < m; i += 2) {
        for (var j = 0; j < n; j += 2) {
            var dots = [
                data[i][j],
                data[i + 1][j],
                data[i][j + 1],
                data[i + 1][j + 1],
            ];

            if (dots.every(dot => !['O', '#'].includes(dot))) {
                result++;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
