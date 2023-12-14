const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var m = data.length;
    var n = data[0].length;
    var result = 0;

    var pictureToIterationMap = new Map();
    var iterationToPictureMap = new Map();

    var iter = 0;
    while (1) {
        // TOP
        for (var j = 0; j < n; j++) {
            var i = 0;
            while (i < m) {
                if (data[i][j] === 'O') {
                    while (data[i - 1]?.[j] === '.') {
                        data[i - 1][j] = 'O';
                        data[i][j] = '.';
                        i--;
                    }
                }
                i++;
            }
        }

        // LEFT
        for (var i = 0; i < m; i++) {
            var j = 0;
            while (j < n) {
                if (data[i][j] === 'O') {
                    while (data[i]?.[j - 1] === '.') {
                        data[i][j - 1] = 'O';
                        data[i][j] = '.';
                        j--;
                    }
                }
                j++;
            }
        }

        // DOWN
        for (var j = 0; j < n; j++) {
            var i = m - 1;
            while (i >= 0) {
                if (data[i][j] === 'O') {
                    while (data[i + 1]?.[j] === '.') {
                        data[i + 1][j] = 'O';
                        data[i][j] = '.';
                        i++;
                    }
                }
                i--;
            }
        }

        // RIGHT
        for (var i = 0; i < m; i++) {
            var j = n - 1;
            while (j >= 0) {
                if (data[i][j] === 'O') {
                    while (data[i]?.[j + 1] === '.') {
                        data[i][j + 1] = 'O';
                        data[i][j] = '.';
                        j++;
                    }
                }
                j--;
            }
        }

        iter++;

        var cacheKey = data.map(line => line.join('')).join('\n');

        if (pictureToIterationMap.has(cacheKey)) {
            break;
        }

        pictureToIterationMap.set(cacheKey, iter);
        iterationToPictureMap.set(iter, cacheKey);
    }

    var lastSeen = pictureToIterationMap.get(
        data.map(line => line.join('')).join('\n')
    );

    var cycle = iter - lastSeen;

    var cacheKey = iterationToPictureMap.get(
        ((1000000000 - lastSeen) % cycle) + lastSeen
    );

    data = cacheKey.split('\n').map(line => line.split(''));

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === 'O') {
                result += m - i;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
