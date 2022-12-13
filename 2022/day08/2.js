const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split('').map(val => +val));

    var m = data.length;
    var n = data[0].length;

    var result = -Infinity;

    for (var i = 1; i < m - 1; i++) {
        for (var j = 1; j < n - 1; j++) {
            var height = data[i][j];
            var top = 0,
                bottom = 0,
                left = 0,
                right = 0;

            for (var k = i - 1; k >= 0; k--) {
                top++;
                if (data[k][j] >= height) break;
            }

            for (var k = i + 1; k < m; k++) {
                bottom++;
                if (data[k][j] >= height) break;
            }

            for (var k = j - 1; k >= 0; k--) {
                left++;
                if (data[i][k] >= height) break;
            }
            for (var k = j + 1; k < n; k++) {
                right++;
                if (data[i][k] >= height) break;
            }
            result = Math.max(result, top * bottom * left * right);
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
