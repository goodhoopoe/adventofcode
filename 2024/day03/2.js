const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    const arr = data.match(/(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g);

    let result = 0;
    let shouldCount = true;
    for (const line of arr) {
        if (line === 'do()') {
            shouldCount = true;
            continue;
        }
        if (line === "don't()") {
            shouldCount = false;
        }
        if (shouldCount) {
            const nums = line
                .substring(4)
                .substring(0, line.length - 5)
                .split(',')
                .map((v) => +v);

            result += nums[0] * nums[1];
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
0