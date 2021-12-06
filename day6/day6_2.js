const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let result = 0;
    let arr = data
        .split(',')
        .map(el => +el)
        .reduce((acc, val) => {
            acc[val]++;
            return acc;
        }, Array(9).fill(0));

    for (let i = 0; i < 256; i++) {
        const [zero, ...copy] = arr;
        arr = copy;
        copy.push(zero);
        copy[6] += zero;
    }
    result = arr.reduce((acc, val) => (acc += val), 0);
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
