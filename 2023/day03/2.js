const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var dirs = [
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    var adj = {};

    for (var i = 0; i < data.length; i++) {
        var indexes = [];
        for (var j = 0; j <= data[i].length; j++) {
            if (isNaN(Number(data[i][j])) || data[i] === undefined) {
                if (indexes.length === 0) {
                    continue;
                }

                for (var index of indexes) {
                    if (
                        dirs.some(([dx, dy]) => {
                            var cell = data[i + dx]?.[index + dy];
                            if (cell === undefined) {
                                return false;
                            }

                            if (cell === '*') {
                                var key = `${i + dx}-${index + dy}`;
                                if (!adj[key]) {
                                    adj[key] = [];
                                }
                                adj[key].push(
                                    indexes
                                        .map(index => data[i][index])
                                        .join('')
                                );
                                return true;
                            }
                            return false;
                        })
                    ) {
                        break;
                    }
                }
                indexes = [];
            } else {
                if (!isNaN(Number(data[i][j]))) {
                    indexes.push(j);
                }
            }
        }
    }

    var result = Object.values(adj)
        .filter(nums => nums.length === 2)
        .map(nums => nums[0] * nums[1])
        .reduce((a, v) => a + v, 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
