const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split('').map(Number));

    var m = data.length;
    var n = data[0].length;
    var visited = [];

    for (var i = 0; i < m; i++) {
        visited.push(Array(n).fill(+Infinity));
    }

    visited[0][0] = data[0][0];

    var shortestPath;

    var directions = {
        right: [0, 1],
        down: [1, 0],
        up: [-1, 0],
        left: [0, -1],
    };

    var q = [
        {
            x: 0,
            y: 0,
            sum: data[0][0],
            direction: 'right',
            directionMovesLeft: 2,
            path: [[0, 0]],
        },
        {
            x: 0,
            y: 0,
            sum: data[0][0],
            direction: 'down',
            directionMovesLeft: 2,
            path: [[0, 0]],
        },
    ];

    while (q.length) {
        var newQ = [];

        for (var item of q) {
            if (item.x === m - 1 && item.y === n - 1) {
                // console.log(result, item.sum);
                // console.log(item.path);

                if (item.sum <= visited[m - 1][n - 1])
                    shortestPath = [...item.path];

                continue;
            }

            visited[item.x][item.y] = Math.min(
                visited[item.x][item.y],
                item.sum
            );

            for (var direction in directions) {
                var x0 = item.x + directions[direction][0];
                var y0 = item.y + directions[direction][1];

                if (
                    direction === item.direction &&
                    item.directionMovesLeft === 0
                )
                    continue;

                if (
                    x0 >= 0 &&
                    x0 < m &&
                    y0 >= 0 &&
                    y0 < n
                    // visited[x0][y0] >= item.sum + data[x0][y0]
                ) {
                    newQ.push({
                        x: x0,
                        y: y0,
                        sum: item.sum + data[x0][y0],
                        direction,
                        directionMovesLeft:
                            item.direction === direction
                                ? item.directionMovesLeft - 1
                                : 2,

                        path: [
                            ...item.path,
                            [x0, y0, direction, item.directionMovesLeft],
                        ],
                    });

                    visited[x0][y0] = Math.min(
                        item.sum + data[x0][y0],
                        visited[0][y0]
                    );
                }
            }
        }
        q = newQ;
    }

    var result = visited[m - 1][n - 1];
    console.log(shortestPath);
    console.log(
        data
            .map((line, x) =>
                line
                    .map((val, y) => {
                        var direction = shortestPath.find(
                            node => node[0] === x && node[1] === y
                        );

                        var symbol = val + '';

                        if (direction) {
                            if (direction[2] === 'up') symbol += '^';
                            if (direction[2] === 'down') symbol += 'v';
                            if (direction[2] === 'left') symbol += '<';
                            if (direction[2] === 'right') symbol += '>';
                        }
                        return `${symbol.padStart(4, ' ')} `;
                    })
                    .join('')
            )
            .join('\n')
    );

    console.log('____');

    console.log(
        data.map(line => line.map(val => `   ${val} `).join('')).join('\n')
    );
    console.log('____');
    console.log(
        visited
            .map(line =>
                line.map(val => val.toString().padStart(4, ' ') + ' ').join('')
            )
            .join('\n')
    );

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
