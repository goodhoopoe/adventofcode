const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data
        .split(utils.DOUBLE_LINE_BREAK)
        .map(block => block.split(utils.LINE_BREAK));

    var calories = data.reduce((sum, arr, i) => {
        var value = arr.reduce((acc, val) => acc + +val, 0);
        sum[i] = value;
        return sum;
    }, {});

    const result = Object.values(calories)
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, v) => a + v, 0);
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
