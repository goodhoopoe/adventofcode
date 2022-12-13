const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split('').map(val => +val));

    var m = data.length;
    var n = data[0].length;
    var dp = [];

    for (var i = 0; i < m; i++) {
        dp.push([]);
        for (var j = 0; j < n; j++) {
            dp[i][j] = 0;
        }
    }

    // left
    for (var i = 0; i < m; i++) {
        dp[i][0] = 1;
        var max = data[i][0];
        for (let j = 1; j < n; j++) {
            if (data[i][j] > max) {
                dp[i][j] = 1;
                max = data[i][j];
            }
        }
    }

    // right
    for (var i = 0; i < m; i++) {
        dp[i][n - 1] = 1;
        var max = data[i][n - 1];
        for (let j = n - 2; j >= 0; j--) {
            if (data[i][j] > max) {
                dp[i][j] = 1;
                max = data[i][j];
            }
        }
    }

    // top
    for (var j = 0; j < n; j++) {
        dp[0][j] = 1;
        var max = data[0][j];

        for (let i = 1; i < m; i++) {
            if (data[i][j] > max) {
                dp[i][j] = 1;
                max = data[i][j];
            }
        }
    }

    // bottom
    for (var j = 0; j < n; j++) {
        dp[m - 1][j] = 1;
        var max = data[m - 1][j];

        for (let i = m - 2; i >= 0; i--) {
            if (data[i][j] > max) {
                dp[i][j] = 1;
                max = data[i][j];
            }
        }
    }
    var result = 0;

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            result += dp[i][j];
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
