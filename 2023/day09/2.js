const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data
        .split(utils.LINE_BREAK)
        .map(line => line.split(' ').map(Number));

    var result = 0;

    for (var source of data) {
        var matrix = [source];
        var stop = false;
        var iter = 0;
        while (!stop) {
            matrix.push([]);
            for (var i = 0; i < matrix[iter].length - 1; i++) {
                matrix.at(-1).push(matrix[iter][i + 1] - matrix[iter][i]);
            }
            iter++;
            if (matrix[iter].every(val => val === 0)) {
                break;
            }
        }

        for (var i = matrix.length - 1; i > 0; i--) {
            matrix[i - 1].unshift(matrix[i - 1].at(0) - matrix[i].at(0));
        }

        result += matrix[0].at(0);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
