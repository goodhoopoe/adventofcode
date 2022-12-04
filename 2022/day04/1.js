const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data
        .split(utils.LINE_BREAK)
        .map(line =>
            line.split(',').map(block => block.split('-').map(num => +num))
        );

    var result = 0;

    for (var [[start1, end1], [start2, end2]] of data) {
        if (
            (start1 <= start2 && end2 <= end1) ||
            (start2 <= start1 && end1 <= end2)
        ) {
            result++;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
