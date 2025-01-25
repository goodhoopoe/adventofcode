const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var matrix = [[]];
    var x = 0;
    var y = 0;
    var minX = +Infinity;
    var maxX = -Infinity;
    var minY = +Infinity;
    var maxY = -Infinity;

    for (var line of data) {
        var direction = line[0];
        var count = Number(line[1]);

        if (direction === 'R') y += count;
        if (direction === 'L') y -= count;
        if (direction === 'D') x += count;
        if (direction === 'U') x -= count;

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    var matrix = [];

    var m = maxX - minX + 1;
    var n = maxY - minY + 1;

    for (var i = 0; i < m; i++) {
        matrix.push(Array(n).fill('.'));
    }

    var x = Math.abs(minX);
    var y = Math.abs(minY);

    for (var line of data) {
        var direction = line[0];
        var count = Number(line[1]);

        for (var c = 1; c <= count; c++) {
            if (direction === 'R') matrix[x][++y] = '#';
            if (direction === 'L') matrix[x][--y] = '#';
            if (direction === 'D') matrix[++x][y] = '#';
            if (direction === 'U') matrix[--x][y] = '#';
        }
    }

    var directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    var q = [];
    for (var i = 0; i < m; i++) {
        q.push([i, 0]);
        q.push([i, n - 1]);
    }

    for (var j = 0; j < n; j++) {
        q.push([0, j]);
        q.push([m - 1, j]);
    }

    while (q.length) {
        var newQ = [];

        for (var [x, y] of q) {
            if (matrix[x][y] !== '.') continue;

            matrix[x][y] = 'O';

            for (var [dx, dy] of directions) {
                var x0 = x + dx;
                var y0 = y + dy;

                if (x0 >= 0 && x0 < m && y0 >= 0 && y0 < n) {
                    newQ.push([x0, y0]);
                }
            }
        }

        q = newQ;
    }

    var result =
        m * n -
        matrix.reduce(
            (total, row) =>
                total +
                row.reduce(
                    (rowTotal, symbol) => rowTotal + Number(symbol === 'O'),
                    0
                ),
            0
        );

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
