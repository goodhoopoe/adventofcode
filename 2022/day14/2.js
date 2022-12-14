const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = undefined;
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line =>
        line.split(' -> ').map(block =>
            block
                .split(',')
                .map(val => +val)
                .reverse()
        )
    );

    var maxX = -Infinity;

    for (var arr of data) {
        for (var [x, y] of arr) {
            maxX = Math.max(x + 3, maxX);
        }
    }

    var minY = 500 - maxX;
    var maxY = 500 + maxX;

    var dp = [];
    for (let i = 0; i <= maxX; i++) {
        dp.push(Array(maxY - minY + 3).fill('.'));
    }

    for (let i = 0; i < dp[0].length; i++) {
        dp[maxX - 1][i] = '#';
    }

    for (var arr of data) {
        for (var i = 1; i < arr.length; i++) {
            var [startX, startY] = arr[i - 1];
            var [endX, endY] = arr[i];
            if (startX === endX) {
                for (
                    var j = Math.min(startY, endY);
                    j <= Math.max(startY, endY);
                    j++
                ) {
                    dp[startX][j - minY + 1] = '#';
                }
            }
            if (startY === endY) {
                for (
                    var j = Math.min(startX, endX);
                    j <= Math.max(startX, endX);
                    j++
                ) {
                    dp[j][startY - minY + 1] = '#';
                }
            }
        }
    }

    var result = 0;

    var startX = 0;
    var startY = 500 - minY + 1;
    var stop = false;
    while (1) {
        var x = startX;
        var y = startY;
        if (dp[x][y] === 'o') break;
        result++;
        dp[x][y] = 'o';
        while (1) {
            if (dp[x + 1][y] === '.') {
                dp[x][y] = '.';
                dp[x + 1][y] = 'o';
                x++;
            } else if (dp[x + 1][y - 1] === '.') {
                dp[x][y] = '.';
                dp[x + 1][y - 1] = 'o';
                x++;
                y--;
            } else if (dp[x + 1][y + 1] === '.') {
                dp[x][y] = '.';
                dp[x + 1][y + 1] = 'o';
                x++;
                y++;
            } else {
                break;
            }
        }

        if (stop) break;
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
