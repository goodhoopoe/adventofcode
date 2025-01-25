const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = undefined;
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK);

    var min = +Infinity,
        max = -Infinity;

    for (var line of data) {
        var [x, y, z] = line.split(',').map(Number);
        min = Math.min(min, x, y, z);
        max = Math.max(max, x, y, z);
    }

    var dirs = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
    ];

    var blocks = new Set(data);
    var result = 0;

    for (var x = min; x <= max; x++) {
        for (var y = min; y <= max; y++) {
            for (var z = min; z <= max; z++) {
                if (!blocks.has(`${x},${y},${z}`)) continue;
                for (var [dx, dy, dz] of dirs) {
                    var x0 = x + dx;
                    var y0 = y + dy;
                    var z0 = z + dz;
                    if (!blocks.has(`${x0},${y0},${z0}`)) {
                        result++;
                    }
                }
            }
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
