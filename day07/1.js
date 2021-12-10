const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(NlogN)');
    data = data.split(',').map(el => +el);
    data.sort((a, b) => a - b);
    const x = data[Math.trunc(data.length / 2 + 1) - 1];
    const result = data.reduce((acc, val) => (acc += Math.abs(val - x)), 0);
    console.timeEnd('O(NlogN)');
    console.log(result);
})(process.argv[1]);
