const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.DOUBLE_LINE_BREAK)
        .map(line => line.split(utils.LINE_BREAK));

    var result = 0;

    for (var i = 0; i < data.length; i++) {
        var left = eval(data[i][0]);
        var right = eval(data[i][1]);
        // console.log('_________');
        try {
            compare(left, right);
        } catch (e) {
            if (e) {
                result += i + 1;
            }
        }
    }

    function compare(left, right) {
        if (left === undefined) throw true;
        if (right === undefined) throw false;
        if (left === right) return;
        if (!Array.isArray(left) && !Array.isArray(right)) {
            throw left < right;
        }
        if (Array.isArray(left) && !Array.isArray(right)) {
            right = [right];
        }
        if (Array.isArray(right) && !Array.isArray(left)) {
            left = [left];
        }
        for (var i = 0; i < Math.max(left.length, right.length); i++) {
            compare(left[i], right[i]);
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
