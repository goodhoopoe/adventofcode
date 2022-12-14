const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(NlogN)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.LINE_BREAK)
        .filter(Boolean)
        .map(line => eval(line));

    var first = [[2]];
    var second = [[6]];
    data.push(first);
    data.push(second);

    data.sort((a, b) => {
        try {
            compare(a, b);
        } catch (e) {
            return e;
        }
    });

    function compare(left, right) {
        if (left === undefined) throw -1;
        if (right === undefined) throw 1;
        if (left === right) return;
        if (!Array.isArray(left) && !Array.isArray(right)) {
            throw left < right ? -1 : 1;
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

    var result =
        (data.findIndex(item => first === item) + 1) *
        (data.findIndex(item => item === second) + 1);

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
