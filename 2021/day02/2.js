const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);
    let x = 0;
    let y = 0;
    let aim = 0;
    for (const line of data) {
        const [op, val] = line.split(' ');
        if (op === 'forward') {
            x += +val;
            y += aim * val;
        }
        if (op === 'up') aim -= +val;

        if (op === 'down') aim += +val;
    }

    console.timeEnd();
    console.log(x * y);
})(process.argv[1]);
