const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var power = data
        .map(line => line.split('').filter(char => !isNaN(+char)))
        .reduce((a, v) => a + +(v[0] + v.at(-1)), 0);

    console.timeEnd();
    console.log(power);
})(process.argv[1]);
