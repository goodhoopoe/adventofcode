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

    var adj = { [`${startX}_${startY}`]: [], [`${endX}_${endY}`]: [] };

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '#') continue;

            var edgesCount = directions.filter(([dx, dy]) => {
                var x0 = i + dx;
                var y0 = j + dy;

                return data[x0]?.[y0] !== undefined && data[x0]?.[y0] !== '#';
            }).length;

            if (edgesCount > 2) {
                adj[`${i}_${j}`] = [];
            }
        }
    }

    for (var key in adj) {
        var [indexX, indexY] = key.split('_').map(Number);

        var q = [[indexX, indexY]];

        var iter = 0;
        var visited = new Set();

        while (q.length) {
            var newQ = [];

            for (var [x, y] of q) {
                var vertex = `${x}_${y}`;
                if (iter > 0 && adj[vertex]) {
                    adj[key].push({ target: vertex, distance: iter });
                    continue;
                }

                visited.add(x * n + y);

                for (var [dx, dy] of directions) {
                    var x0 = x + dx;
                    var y0 = y + dy;

                    if (
                        x0 >= 0 &&
                        x0 < m &&
                        y0 >= 0 &&
                        y0 < n &&
                        !visited.has(x0 * n + y0) &&
                        data[x0][y0] !== '#'
                    ) {
                        newQ.push([x0, y0]);
                    }
                }
            }

            q = newQ;
            iter++;
        }
    }

    const cache = new Set();
    var result = -Infinity;

    function dfs(key, sum) {
        if (key === `${endX}_${endY}`) {
            result = Math.max(result, sum);

            return;
        }

        if (cache.has(key)) return;

        for (var vertex of adj[key]) {
            cache.add(key);
            dfs(vertex.target, sum + vertex.distance);
            cache.delete(key);
        }
    }

    dfs(`${startX}_${startY}`, 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
