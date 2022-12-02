const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var result = 0;
    var myScore = { X: 0, Y: 3, Z: 6 };
    var score = {
        AX: 3,
        AY: 1,
        AZ: 2,
        BX: 1,
        BY: 2,
        BZ: 3,
        CX: 2,
        CY: 3,
        CZ: 1,
    };
    for (var [x, y] of data) {
        result += score[x + y];
        result += myScore[y];
    }
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
