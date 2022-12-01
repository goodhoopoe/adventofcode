const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(NlogN)');
    data = data.split(',').map(el => +el);

    let start = Math.min(...data);
    let end = Math.max(...data);

    while (start < end) {
        const mid = Math.trunc((end - start) / 2) + start;

        if (count(mid) > count(mid + 1)) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    const result = count(start);

    function count(mid) {
        return data.reduce(
            (acc, val) =>
                (acc += (Math.abs(val - mid) * (Math.abs(mid - val) + 1)) / 2),
            0
        );
    }
    console.timeEnd('O(NlogN)');
    console.log(result);
})(process.argv[1]);
