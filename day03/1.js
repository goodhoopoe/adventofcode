const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);
    const len = data[0].length;

    data = data.map(el => parseInt(el, 2));

    let shift = 1 << 11;
    let val = 0;
    for (let j = 0; j < len; j++) {
        val <<= 1;
        let ones = data.reduce((acc, val) => (acc += !!(val & shift)), 0);
        let zeroes = data.length - ones;
        val |= ones > zeroes;
        shift >>= 1;
    }

    console.timeEnd();
    console.log(val * (val ^ (2 ** len - 1)));
})(process.argv[1]);
