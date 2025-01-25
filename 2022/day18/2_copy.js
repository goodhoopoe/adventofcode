const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split(',').map(Number));

    var dirs = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
    ];
    var q = [data[0]];
    var allBlocks = new Set(
        data.map(block => `${block[0]}_${block[1]}_${block[2]}`)
    );
    console.log(allBlocks);
    var coolingBlocks = {};
    var remainingBlocks = new Set([...allBlocks]);
    var cache = new Set([`${data[0][0]}_${data[0][1]}_${data[0][2]}`]);
    var result = 0;

    while (q.length > 0 || remainingBlocks.size > 0) {
        if (q.length === 0) {
            q = [remainingBlocks.values().next().value.split('_').map(Number)];
            continue;
        }

        var nq = [];

        for (var [x, y, z] of q) {
            remainingBlocks.delete(`${x}_${y}_${z}`);
            dirs.forEach(([dx, dy, dz]) => {
                var x0 = x + dx;
                var y0 = y + dy;
                var z0 = z + dz;

                var nextBlockKey = `${x0}_${y0}_${z0}`;

                if (cache.has(nextBlockKey)) return;

                if (!allBlocks.has(nextBlockKey)) {
                    result++;
                    if (!coolingBlocks[nextBlockKey])
                        coolingBlocks[nextBlockKey] = 0;
                    coolingBlocks[nextBlockKey]++;
                    return;
                }
                cache.add(nextBlockKey);
                nq.push([x0, y0, z0]);
            });
        }

        q = nq;
    }

    var candidates = Object.entries(coolingBlocks).map(([key, val]) => [
        key.split('_').map(Number),
        val,
    ]);

    for (var [[x, y, z], val] of candidates) {
        var count = 0;
        for (var [dx, dy, dz] of dirs) {
            for (var i = 1; i <= 30; i++) {
                var x0 = x + dx * i;
                var y0 = y + dy * i;
                var z0 = z + dz * i;
                if (allBlocks.has(`${x0}_${y0}_${z0}`)) {
                    count++;
                    break;
                }
            }
        }
        console.log({ x, y, z, count });
        if (count === 6) {
            result -= val;
            // console.log({ x, y, z });
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
