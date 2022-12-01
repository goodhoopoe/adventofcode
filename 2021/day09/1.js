const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(N)');
    data = data
        .split(utils.LINE_BREAK)
        .map(row => [+Infinity, ...row.split('').map(el => +el), +Infinity]);
    data.unshift(Array(data[0].length).fill(+Infinity));
    data.push(Array(data[0].length).fill(+Infinity));
    let result = 0;

    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            if (
                data[i - 1][j] > data[i][j] &&
                data[i + 1][j] > data[i][j] &&
                data[i][j - 1] > data[i][j] &&
                data[i][j + 1] > data[i][j]
            ) {
                result += data[i][j] + 1;
            }
        }
    }

    console.timeEnd('O(N)');
    console.log(result);
})(process.argv[1]);
