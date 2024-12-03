const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    const arr = data.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
    let result = 0;
    for (const line of arr) {
        const nums = line
            .substring(4)
            .substring(0, line.length - 5)
            .split(',')
            .map((v) => +v);

        result += nums[0] * nums[1];
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
