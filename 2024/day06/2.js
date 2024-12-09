const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var baseX = 0,
        baseY = 0,
        m = data.length,
        n = data[0].length;

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '^') {
                baseX = i;
                baseY = j;
            }
        }
    }

    var x = baseX,
        y = baseY;

    var directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    var currentDirection = 3;
    var result = 0;

    var walkpath = [];

    while (x >= 0 && y >= 0 && x < m && y < n) {
        walkpath.push([x, y]);
        var dx = directions[currentDirection][0];
        var dy = directions[currentDirection][1];

        var x0 = x + dx;
        var y0 = y + dy;

        if (data[x0]?.[y0] === '#') {
            currentDirection = (currentDirection + 1) % 4;
        } else {
            x = x0;
            y = y0;
        }
    }
    walkpath = walkpath.slice(1);
    var visitedNodes = new Set();
    for (var [startX, startY] of walkpath) {
        var nodeKey = [startX, startY].join('-');
        if (visitedNodes.has(nodeKey)) continue;
        visitedNodes.add(nodeKey);
        x = baseX;
        y = baseY;

        currentDirection = 3;
        var visited = new Set();
        data[startX][startY] = '#';

        while (x >= 0 && y >= 0 && x < m && y < n) {
            var key = [x, y, currentDirection].join('-');

            if (visited.has(key)) {
                result++;
                break;
            }
            visited.add(key);
            var dx = directions[currentDirection][0];
            var dy = directions[currentDirection][1];

            var x0 = x + dx;
            var y0 = y + dy;

            if (data[x0]?.[y0] === '#') {
                currentDirection = (currentDirection + 1) % 4;
            } else {
                x = x0;
                y = y0;
            }
        }

        data[startX][startY] = '.';
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
