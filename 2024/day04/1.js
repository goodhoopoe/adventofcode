const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var word = 'XMAS';
    var result = 0;
    var directions = [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
    ];

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
            for (var [dx, dy] of directions) {
                var check = [
                    data[i][j],
                    data[i + dx]?.[j + dy],
                    data[i + 2 * dx]?.[j + 2 * dy],
                    data[i + 3 * dx]?.[j + 3 * dy],
                ]
                    .filter(Boolean)
                    .join('');
                if (check === word) result++;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
