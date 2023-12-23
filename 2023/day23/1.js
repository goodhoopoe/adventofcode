const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(block => block.split(''));

    var directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    var mapping = {
        '>': 0,
        '<': 1,
        v: 2,
        '^': 3,
    };

    var startX = 0;
    var startY;

    var m = data.length;
    var n = data[0].length;

    var endX = m - 1;
    var endY;

    for (var j = 0; j < n; j++) {
        if (data[0][j] === '.') {
            startY = j;
            break;
        }
    }

    for (var j = 0; j < n; j++) {
        if (data[m - 1][j] === '.') {
            endY = j;
            break;
        }
    }

    var iter = 0;
    var result = -Infinity;
    var cache = new Set();

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '#') {
                cache.add(i * n + j);
            }
        }
    }

    function dfs(x, y) {
        if (x === endX && y === endY) {
            result = Math.max(result, iter);
            return;
        }

        cache.add(x * n + y);
        iter++;

        if (mapping[data[x][y]] !== undefined) {
            var x0 = x + directions[mapping[data[x][y]]][0];
            var y0 = y + directions[mapping[data[x][y]]][1];

            if (
                x0 >= 0 &&
                x0 < m &&
                y0 >= 0 &&
                y0 < n &&
                !cache.has(x0 * n + y0)
            ) {
                dfs(x0, y0);
            }
        } else {
            for (var [dx, dy] of directions) {
                var x0 = x + dx;
                var y0 = y + dy;

                if (
                    x0 >= 0 &&
                    x0 < m &&
                    y0 >= 0 &&
                    y0 < n &&
                    !cache.has(x0 * n + y0)
                ) {
                    dfs(x0, y0);
                }
            }
        }

        cache.delete(x * n + y);
        iter--;
    }

    dfs(startX, startY);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
