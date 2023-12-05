const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    var rawSeeds = data[0].split(': ')[1].split(' ').map(Number);
    var seeds = [];
    for (var i = 0; i < rawSeeds.length; i += 2) {
        seeds.push([rawSeeds[i], rawSeeds[i] + rawSeeds[i + 1] - 1]);
    }

    data = data.slice(1);

    var result = +Infinity;
    var intervals = [];
    var iter = 0;
    for (var operation of data) {
        var rawIntervals = operation
            .split(utils.LINE_BREAK)
            .slice(1)
            .map(line => {
                var [target, source, range] = line.split(' ').map(Number);
                return [source, source + range - 1, target];
            })
            .sort((a, b) => a[0] - b[0]);

        var newInterval = [rawIntervals[0]];
        intervals[iter++] = newInterval;

        for (var i = 1; i < rawIntervals.length; i++) {
            if (rawIntervals[i][0] - rawIntervals[i - 1][1] === 1) {
                newInterval.push(rawIntervals[i]);
                continue;
            }
            newInterval.push([
                rawIntervals[i - 1][1] + 1,
                rawIntervals[i][0] - 1,
                rawIntervals[i - 1][1] + 1,
            ]);
        }
    }

    var n = intervals.length;

    function dfs(index, range) {
        if (index === n) {
            result = Math.min(result, range[0]);
            return;
        }

        var rawRange = [...range];

        var newRange = [];
        if (rawRange[0] < intervals[index][0][0]) {
            newRange.push([rawRange[0], intervals[index][0][0] - 1]);
            rawRange[0] = newRange.at(-1)[1] + 1;
        }

        for (var [start, end, shift] of intervals[index]) {
            if (rawRange[0] > end || rawRange[1] < start) {
                continue;
            }

            newRange.push([
                shift + rawRange[0] - start,
                shift + Math.min(rawRange[1], end) - start,
            ]);

            rawRange[0] = Math.min(rawRange[1], end) + 1;
        }

        if (rawRange[0] > intervals[index].at(-1)[1]) {
            newRange.push(rawRange);
        }
        newRange.forEach(r => dfs(index + 1, r));
    }

    for (var seed of seeds) {
        dfs(0, seed);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
