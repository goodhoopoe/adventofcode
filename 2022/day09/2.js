const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var snake = Array(10)
        .fill(0)
        .map(_ => [0, 0]);

    var commands = {
        R: [0, 1],
        L: [0, -1],
        U: [1, 0],
        D: [-1, 0],
    };
    var visited = new Set(['0_0']);
    for (var [command, amount] of data) {
        var [dx, dy] = commands[command];

        for (var i = 1; i <= amount; i++) {
            snake[0][0] += dx;
            snake[0][1] += dy;
            for (var j = 1; j < snake.length; j++) {
                var hx = snake[j - 1][0];
                var tx = snake[j][0];
                var hy = snake[j - 1][1];
                var ty = snake[j][1];
                if (Math.abs(hx - tx) === 2 || Math.abs(hy - ty) === 2) {
                    if (hx !== tx) snake[j][0] += hx - tx > 0 ? 1 : -1;
                    if (hy !== ty) snake[j][1] += hy - ty > 0 ? 1 : -1;
                }
            }

            visited.add(`${snake.at(-1)[0]}_${snake.at(-1)[1]}`);
        }
    }
    var result = visited.size;

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
