const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var m = data.length;
    var n = data[0].length;

    var max = -Infinity;

    var starts = [];

    for (var j = 0; j < n; j++) {
        starts.push([-1, j, 0, j]);
        starts.push([m, j, m - 1, j]);
    }

    for (var i = 0; i < m; i++) {
        starts.push([i, -1, i, 0]);
        starts.push([i, n, i, n - 1]);
    }

    for (var start of starts) {
        var q = [start];

        var visited = new Set([]);
        var directions = new Set([]);

        while (q.length) {
            var newQ = [];

            for (var [prevX, prevY, x, y] of q) {
                if (x < 0 || x === m || y < 0 || y === n) continue;

                if (directions.has(`${prevX}-${prevY}-${x}-${y}`)) continue;

                visited.add(x * n + y);
                directions.add(`${prevX}-${prevY}-${x}-${y}`);

                if (data[x][y] === '.') {
                    newQ.push([x, y, x + x - prevX, y + y - prevY]);
                }

                if (data[x][y] === '\\') {
                    if (prevX === x && prevY === y - 1)
                        newQ.push([x, y, x + 1, y]);
                    if (prevX === x && prevY === y + 1)
                        newQ.push([x, y, x - 1, y]);
                    if (prevX === x - 1 && prevY === y)
                        newQ.push([x, y, x, y + 1]);
                    if (prevX === x + 1 && prevY === y)
                        newQ.push([x, y, x, y - 1]);
                }

                if (data[x][y] === '/') {
                    if (prevX === x && prevY === y - 1)
                        newQ.push([x, y, x - 1, y]);
                    if (prevX === x && prevY === y + 1)
                        newQ.push([x, y, x + 1, y]);
                    if (prevX === x - 1 && prevY === y)
                        newQ.push([x, y, x, y - 1]);
                    if (prevX === x + 1 && prevY === y)
                        newQ.push([x, y, x, y + 1]);
                }

                if (data[x][y] === '-') {
                    if (prevX === x && prevY === y - 1)
                        newQ.push([x, y, x, y + 1]);
                    if (prevX === x && prevY === y + 1)
                        newQ.push([x, y, x, y - 1]);
                    if (prevX === x - 1 && prevY === y) {
                        newQ.push([x, y, x, y - 1]);
                        newQ.push([x, y, x, y + 1]);
                    }
                    if (prevX === x + 1 && prevY === y) {
                        newQ.push([x, y, x, y - 1]);
                        newQ.push([x, y, x, y + 1]);
                    }
                }

                if (data[x][y] === '|') {
                    if (prevX === x - 1 && prevY === y)
                        newQ.push([x, y, x + 1, y]);
                    if (prevX === x + 1 && prevY === y)
                        newQ.push([x, y, x - 1, y]);
                    if (prevX === x && prevY === y - 1) {
                        newQ.push([x, y, x - 1, y]);
                        newQ.push([x, y, x + 1, y]);
                    }
                    if (prevX === x && prevY === y + 1) {
                        newQ.push([x, y, x - 1, y]);
                        newQ.push([x, y, x + 1, y]);
                    }
                }
            }

            q = newQ;
        }
        var print = [];
        for (var i = 0; i < m; i++) {
            print.push([]);
            for (var j = 0; j < n; j++) {
                if (visited.has(i * n + j)) {
                    print[i][j] = '#';
                } else {
                    print[i][j] = '.';
                }
            }
        }
        max = Math.max(max, visited.size);
    }

    var result = max;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
