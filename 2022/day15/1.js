const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(NlogN)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.match(/-?[\d]+/g).map(Number));

    var TARGET_ROW = 2_000_000;
    var intervals = [];
    var beaconsOnTargetRow = new Set();

    for (var [sx, sy, bx, by] of data) {
        if (by === TARGET_ROW) {
            beaconsOnTargetRow.add(bx);
        }
        var distance = Math.abs(sx - bx) + Math.abs(sy - by);

        var beaconsOnTarget = Math.max(distance - Math.abs(sy - TARGET_ROW), 0);
        if (beaconsOnTarget === 0) continue;

        intervals.push([sx - beaconsOnTarget, sx + beaconsOnTarget]);
    }

    intervals.sort((a, b) => a[0] - b[0]);

    var mergedIntervals = [[...intervals[0]]];
    for (var i = 1; i < intervals.length; i++) {
        var [_, prevEnd] = mergedIntervals.at(-1);
        var [currentStart, currentEnd] = intervals[i];
        if (prevEnd < currentStart) {
            mergedIntervals.push([currentStart, currentEnd]);
        } else {
            mergedIntervals.at(-1)[1] = Math.max(prevEnd, currentEnd);
        }
    }

    var result = 0;

    for (var x of beaconsOnTargetRow) {
        if (
            mergedIntervals.some(
                interval => interval[0] <= x && x <= interval[1]
            )
        ) {
            result--;
        }
    }

    result += mergedIntervals.reduce(
        (acc, val) => acc + (val[1] - val[0] + 1),
        0
    );

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
