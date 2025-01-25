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
    var n = data.length;
    var m = data[0].length;

    var q = [];
    var visited = new Set();

    var totalSteps = 64;

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (data[i][j] === 'S') {
                q.push([i, j]);
            }
            if (data[i][j] === '#') {
                visited.add(i * n + j);
            }
        }
    }

    var iter = 0;

    var result = 0;

    while (q.length && iter <= totalSteps) {
        var newQ = [];
        console.log(q);

        for (var [x, y] of q) {
            if (visited.has(x * n + y)) continue;
            visited.add(x * n + y);

            if (data[x][y] === 'O') {
                console.log({ x, y, iter });
            }

            if (iter % 2 === 0) {
                result++;
                data[x][y] = 'O';
            }

            for (var [dx, dy] of directions) {
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
        iter++;
    }

    console.log(data.map(line => line.join('')).join('\n'));
    console.log(26501365);
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
