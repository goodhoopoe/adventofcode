const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var result = 0;
    var myScore = { X: 1, Y: 2, Z: 3 };
    var score = {
        AX: 3,
        AY: 6,
        AZ: 0,
        BX: 0,
        BY: 3,
        BZ: 6,
        CX: 6,
        CY: 0,
        CZ: 3,
    };
    for (var [x, y] of data) {
        result += myScore[y];
        result += score[x + y];
    }
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
