const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    data = data.split(utils.LINE_BREAK);
    let x = 0;
    let y = 0;
    for (const line of data) {
        const [op, val] = line.split(' ');
        if (op === 'forward') x += +val;
        if (op === 'up') y -= +val;
        if (op === 'down') y += +val;
    }

    console.log(x * y);
})(process.argv[1]);
