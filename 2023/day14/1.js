const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var m = data.length;
    var n = data[0].length;
    var result = 0;

    for (var j = 0; j < n; j++) {
        var i = 0;

        while (i < m) {
            if (data[i][j] === '.' || data[i][j] === '#') {
                i++;
                continue;
            }

            while (data[i - 1]?.[j] === '.') {
                data[i - 1][j] = 'O';
                data[i][j] = '.';
                i--;
            }
            i++;
        }
    }

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
