const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(',').map(el => +el);
    data.sort((a, b) => a - b);
    let start = 0;
    let end = data.length - 1;

    while (start < end) {
        console.log(start, end);
        const mid = Math.trunc((end - start) / 2) + start;

        if (
            Math.abs(count(mid) - count(start)) >
            Math.abs(count(mid) - count(end))
        ) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    const x = start;
    const result = data.reduce((acc, val) => (acc += Math.abs(val - x)), 0);

    function count(mid) {
        console.log('mid %s', mid);
        let result = data.reduce((acc, val, i) => {
            console.log(
                i,
                val,
                ((val + data[mid]) * Math.abs(data[mid] - val)) / 2
            );
            return (acc += ((val + data[mid]) * Math.abs(data[mid] - val)) / 2);
        }, 0);
        console.log(mid, result);
    }
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
