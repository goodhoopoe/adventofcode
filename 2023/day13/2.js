const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    var ROWS_SCALE_FACTOR = 100;

    var result = 0;
    var cache = {};

    function calculate(iter, matrix, scaleFactor, changing) {
        var n = matrix[0].length;

        var rows = matrix.map(line =>
            parseInt(line.replaceAll('#', '1').replaceAll('.', '0'), 2)
        );

        for (var r = 0; r < matrix.length - 1; r++) {
            var row = rows[r];

            for (var i = n - 1; i >= 0; i--) {
                if (changing) {
                    rows[r] = row ^ (2 ** i);
                }

                for (
                    var currentRow = 0;
                    currentRow < rows.length - 1;
                    currentRow++
                ) {
                    var lo = currentRow;
                    var hi = currentRow + 1;
                    var mirroredRow = lo;
                    var diff = Math.min(lo, rows.length - hi - 1);
                    var min = lo - diff;
                    var max = hi + diff;

                    while (lo >= min && hi <= max) {
                        if (rows[lo] !== rows[hi]) {
                            mirroredRow = undefined;
                            break;
                        }
                        lo--;
                        hi++;
                    }

                    if (mirroredRow !== undefined) {
                        var computed = (mirroredRow + 1) * scaleFactor;

                        if (!changing) {
                            cache[iter] = computed;
                        } else {
                            if (cache[iter] !== computed) {
                                result += computed;
                                return;
                            }
                        }
                    }
                }
            }
            rows[r] = row;
        }
    }

    for (var c = 0; c < data.length; c++) {
        var block = data[c];

        var matrix = block.split('\n');

        var newBlock = [];

        var matrix = block.split('\n');
        var m = matrix.length;
        var n = matrix[0].length;

        for (var j = 0; j < n; j++) {
            newBlock.push([]);
            for (var i = 0; i < m; i++) {
                newBlock.at(-1).push(matrix[i][j]);
            }
        }

        newBlock = newBlock.map(line => line.join(''));

        calculate(c, matrix, ROWS_SCALE_FACTOR, false);
        calculate(c, newBlock, 1, false);

        calculate(c, matrix, ROWS_SCALE_FACTOR, true);
        calculate(c, newBlock, 1, true);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
