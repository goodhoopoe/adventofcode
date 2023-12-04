const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;

    var y = 0;

    var n = data[0].length;

    for (var x = 0; x < data.length; x++) {
        if (data[x][y] === '#') result++;
        y += 3;
        y = y % n;
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
