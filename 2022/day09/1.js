const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var hx = 0,
        hy = 0,
        tx = 0,
        ty = 0;

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
            hx += dx;
            hy += dy;

            if (Math.abs(hx - tx) === 2) {
                tx += dx;
                ty = hy;
            } else if (Math.abs(hy - ty) === 2) {
                tx = hx;
                ty += dy;
            }
            visited.add(`${tx}_${ty}`);
        }
    }
    var result = visited.size;

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
