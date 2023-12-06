const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var time = Number(data[0].split(/\s+/).slice(1).join(''));
    var distance = Number(data[1].split(/\s+/).slice(1).join(''));

    var result = 0;

    if (time % 2 === 0) {
        result++;
    }

    var start = 0;
    var end = time % 2 === 0 ? time / 2 - 1 : ~~(time / 2);

    while (start < end) {
        var mid = (end + start) >> 1;

        if (mid * (time - mid) > distance) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }

    result += time - 2 * start;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
