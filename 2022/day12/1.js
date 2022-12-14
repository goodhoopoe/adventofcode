const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = undefined;
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var q = [];
    var m = data.length;
    var n = data[0].length;
    var dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    var end;
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === 'S') {
                data[i][j] = 'a';
                q.push([i, j]);
            }
            if (data[i][j] === 'E') {
                data[i][j] = 'z';
                end = i * n + j;
            }
            data[i][j] = data[i][j].charCodeAt(0) - 'a'.charCodeAt(0);
        }
    }

    var result = 0;
    var visited = new Set();
    var stop = false;
    while (q.length) {
        var newQ = [];

        for (var [x, y, path] of q) {
            if (visited.has(x * n + y)) {
                continue;
            }
            if (end === x * n + y) {
                stop = true;
                break;
            }
            visited.add(x * n + y);
            for (var [dx, dy] of dirs) {
                var x0 = x + dx;
                var y0 = y + dy;
                if (
                    x0 < 0 ||
                    x0 === m ||
                    y0 < 0 ||
                    y0 === n ||
                    visited.has(x0 * n + y0) ||
                    data[x0][y0] - data[x][y] > 1
                ) {
                    continue;
                }

                newQ.push([x0, y0]);
            }
        }
        if (stop) break;
        result++;
        q = newQ;
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
