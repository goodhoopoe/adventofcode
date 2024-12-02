
const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map((line) => line.split(' ').map((v) => +v));

    let result = 0;

    for (const nums of data) {
        var arr = Array(nums.length)
            .fill(0)
            .map((_, i) => i);

        if (
            [nums, nums.slice().reverse()].some((num) =>
                arr.some((index) =>
                    num
                        .slice(0, index)
                        .concat(num.slice(index + 1))
                        .every((v, i, iter) => {
                            if (i === 0) return true;
                            const last = iter[i - 1];
                            const current = iter[i];

                            return last < current && current - last > 0 && current - last < 4;
                        }),
                ),
            )
        ) {
            result++;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
