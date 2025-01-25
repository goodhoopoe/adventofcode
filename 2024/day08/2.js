const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var m = data.length,
        n = data[0].length;

    var adj = {};

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            var char = data[i][j];
            if (char === '.') continue;

            if (!adj[char]) adj[char] = [];
            adj[char].push([i, j]);
        }
    }
    console.log(adj);
    var set = new Set();

    for (var values of Object.values(adj)) {
        for (var i = 0; i < values.length; i++) {
            var [x1, y1] = values[i];
            for (var j = i + 1; j < values.length; j++) {
                var [x2, y2] = values[j];

                var dx = x1 - x2;
                var dy = y1 - y2;

                var newX1 = x1 + dx;
                var newX2 = x2 - dx;

                var newY1 = y1 + dy;
                var newY2 = y2 - dy;

                console.log(newX1, newY1, newX2, newY2);

                if (newX1 >= 0 && newX1 < m && newY1 >= 0 && newY1 < n) {
                    set.add(newX1 * m + newY1);
                }

                if (newX2 >= 0 && newX2 < m && newY2 >= 0 && newY2 < n) {
                    set.add(newX2 * m + newY2);
                }
            }
        }
    }

    var result = set.size;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
