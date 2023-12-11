const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    var m = data.length;
    var n = data[0].length;
    var galaxies = [];

    for (var line of data) {
        galaxies.push([...line]);
        if (line.every(char => char === '.')) {
            galaxies.push([...line]);
            m++;
        }
    }

    data = galaxies;
    galaxies = [];
    for (var i = 0; i < m; i++) {
        galaxies.push([]);
    }

    var addColumns = 0;
    for (var j = 0; j < n; j++) {
        var count = 0;
        for (var i = 0; i < m; i++) {
            galaxies[i][j + addColumns] = data[i][j];
            if (data[i][j] === '.') count++;
        }

        if (count === m) {
            addColumns++;
            for (var i = 0; i < m; i++) {
                galaxies[i][j + addColumns] = data[i][j];
            }
        }
    }

    data = galaxies;
    n += addColumns;

    var dots = [];

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (data[i][j] === '#') dots.push([i, j]);
        }
    }

    var result = 0;

    for (var i = 0; i < dots.length - 1; i++) {
        for (var j = i + 1; j < dots.length; j++) {
            var path = Math.abs(
                Math.abs(dots[i][0] - dots[j][0]) +
                    Math.abs(dots[i][1] - dots[j][1])
            );

            result += path;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
