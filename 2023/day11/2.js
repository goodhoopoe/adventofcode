const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var m = data.length;
    var n = data[0].length;
    var rows = [];
    var columns = [];
    var SCALE_FACTOR = 1000000 - 1;

    for (var i = 0; i < data.length; i++) {
        var line = data[i];

        if (line.every(char => char === '.')) {
            rows.push(i);
        }
    }

    for (var j = 0; j < n; j++) {
        var count = 0;
        for (var i = 0; i < m; i++) {
            if (data[i][j] === '.') count++;
        }

        if (count === m) {
            columns.push(j);
        }
    }

    var dots = [];

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '#') dots.push([i, j]);
        }
    }

    var result = 0;

    for (var i = 0; i < dots.length - 1; i++) {
        for (var j = i + 1; j < dots.length; j++) {
            var x1 = dots[i][0];
            var x2 = dots[j][0];
            var y1 = dots[i][1];
            var y2 = dots[j][1];
            var rowCount = 0;
            var columnCount = 0;

            for (var r of rows) {
                if ((x1 < r && r < x2) || (x1 > r && r > x2)) rowCount++;
            }

            for (var c of columns) {
                if ((y1 < c && c < y2) || (y1 > c && c > y2)) columnCount++;
            }

            var path =
                Math.abs(
                    Math.abs(dots[i][0] - dots[j][0]) +
                        Math.abs(dots[i][1] - dots[j][1])
                ) +
                rowCount * SCALE_FACTOR +
                columnCount * SCALE_FACTOR;

            result += path;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
