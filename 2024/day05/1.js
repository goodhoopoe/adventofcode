const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    var result = 0;

    var [dependencies, data] = data.split(utils.DOUBLE_LINE_BREAK);

    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split(',').map(v => +v));

    dependencies = dependencies
        .split(utils.LINE_BREAK)
        .map(line => line.split('|'));

    var before = {};
    var after = {};

    for (var [start, end] of dependencies) {
        if (!before[start]) before[start] = [];
        before[start].push(+end);

        if (!after[end]) after[end] = [];
        after[end].push(+start);
    }

    for (var nums of data) {
        var valid = true;
        for (var i = 0; i < nums.length; i++) {
            for (var j = 0; j < nums.length; j++) {
                if (i === j) continue;

                if (i < j) {
                    if (after[nums[i]]?.includes(nums[j])) {
                        valid = false;
                        break;
                    }
                }
                if (i > j) {
                    if (before[nums[i]]?.includes(nums[j])) {
                        valid = false;
                        break;
                    }
                }
            }

            if (!valid) break;
        }
        if (valid) {
            result += nums[(nums.length - 1) / 2];
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
