const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map((line) => line.split(' ').map((v) => +v));

    let result = 0;

    for (const nums of data) {
        if (
            [nums, nums.slice().reverse()].some((num) =>
                num.every((v, i) => {
                    if (i === 0) return true;
                    const last = num[i - 1];
                    const current = num[i];
                    return last < current && current - last > 0 && current - last < 4;
                }),
            )
        ) {
            result++;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
