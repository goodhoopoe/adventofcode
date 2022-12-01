const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);
    const points = new Set();
    const seen = new Set();
    let result = 0;
    for (const line of data) {
        const [first, second] = line.split(' -> ');
        const [x1, y1] = first.split(',').map(el => +el);
        const [x2, y2] = second.split(',').map(el => +el);
        if (!(x1 === x2 || y1 === y2)) continue;
        const iter = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

        const dx = x1 < x2 ? 1 : x1 === x2 ? 0 : -1;
        const dy = y1 < y2 ? 1 : y1 === y2 ? 0 : -1;

        for (let i = 0; i <= iter; i++) {
            proceed(x1 + dx * i, y1 + dy * i);
        }
    }

    function proceed(x, y) {
        const val = x + '-' + y;
        if (points.has(val) && !seen.has(val)) {
            seen.add(val);
            result++;
            return;
        }

        if (!points.has(val)) {
            points.add(val);
            return;
        }
    }
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
