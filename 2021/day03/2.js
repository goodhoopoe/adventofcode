const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(el => parseInt(el, 2));
    let shift;

    let oxygen = data;
    shift = 1 << 11;
    while (oxygen.length > 1) {
        const ones = oxygen.reduce((acc, val) => (acc += !!(val & shift)), 0);
        const zeroes = oxygen.length - ones;
        const search = ones > zeroes || ones === zeroes ? 1 : 0;

        oxygen = oxygen.filter(ox => !!(ox & shift) == search);
        shift >>= 1;
    }

    let co2 = data;
    shift = 1 << 11;
    while (co2.length > 1) {
        const ones = co2.reduce((acc, val) => (acc += !!(val & shift)), 0);
        const zeroes = co2.length - ones;
        const search = ones > zeroes || ones === zeroes ? 0 : 1;

        co2 = co2.filter(ox => !!(ox & shift) == search);
        shift >>= 1;
    }

    console.timeEnd();
    console.log(oxygen[0] * co2[0]);
})(process.argv[1]);
