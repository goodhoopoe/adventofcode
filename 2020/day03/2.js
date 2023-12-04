const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 1;

    var n = data[0].length;

    for (var [dy, dx] of [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]) {
        var y = 0;
        var temp = 0;
        for (var x = 0; x < data.length; x += dx) {
            if (data[x][y] === '#') temp++;
            y += dy;
            y = y % n;
        }
        result *= temp;
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
