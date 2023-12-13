const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    var ROWS_SCALE_FACTOR = 100;

    var result = 0;

    for (var block of data) {
        var matrix = block.split('\n').map(line => line.split(''));
        var m = matrix.length;
        var n = matrix[0].length;

        var rows = matrix.map(line =>
            parseInt(line.join('').replaceAll('#', '1').replaceAll('.', '0'), 2)
        );

        for (var i = 0; i < rows.length - 1; i++) {
            var lo = i;
            var hi = i + 1;
            var mirroredRow = lo;
            while (lo >= 0 && hi < rows.length) {
                if (rows[lo] !== rows[hi]) {
                    mirroredRow = undefined;
                    break;
                }
                lo--;
                hi++;
            }

            if (mirroredRow !== undefined) {
                result += (mirroredRow + 1) * ROWS_SCALE_FACTOR;
            }
        }

        var columns = [];

        for (var j = 0; j < n; j++) {
            var column = [];
            for (var i = 0; i < m; i++) {
                if (matrix[i][j] === '#') {
                    column.push('1');
                } else {
                    column.push('0');
                }
            }
            columns.push(parseInt(column.join(''), 2));
        }

        for (var i = 0; i < columns.length - 1; i++) {
            var lo = i;
            var hi = i + 1;
            var mirroredColumn = lo;
            while (lo >= 0 && hi < columns.length) {
                if (columns[lo] !== columns[hi]) {
                    mirroredColumn = undefined;
                    break;
                }
                lo--;
                hi++;
            }

            if (mirroredColumn !== undefined) {
                result += mirroredColumn + 1;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
