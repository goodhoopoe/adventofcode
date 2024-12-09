const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var x = 0,
        y = 0,
        m = data.length,
        n = data[0].length;

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '^') {
                x = i;
                y = j;
            }
        }
    }

    var visited = new Set();
    var directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    var currentDirection = 3;

    while (x >= 0 && y >= 0 && x < m && y < n) {
        visited.add(x * m + y);

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

    var result = visited.size;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
