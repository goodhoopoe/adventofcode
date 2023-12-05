const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    var seeds = data[0].split(': ')[1].split(' ').map(Number);
    data = data.slice(1);

    var result = +Infinity;
    var intervals = [];
    var iter = 0;
    for (var operation of data) {
        intervals[iter++] = operation
            .split(utils.LINE_BREAK)
            .slice(1)
            .map(line => {
                var [target, source, range] = line.split(' ').map(Number);
                return [source, source + range - 1, target];
            });
    }

    var n = intervals.length;

    function dfs(index, value) {
        if (index === n) {
            result = Math.min(result, value);
            return;
        }

        var newValue = value;
        var interval = intervals[index].find(
            ([start, end]) => value >= start && value <= end
        );
        if (interval) {
            newValue = interval[2] + (value - interval[0]);
        }
        dfs(index + 1, newValue);
    }

    for (var seed of seeds) {
        dfs(0, seed);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
