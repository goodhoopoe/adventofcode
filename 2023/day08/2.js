const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    var steps = data[0].split('');
    var starts = [];
    var graph = data[1].split(utils.LINE_BREAK).reduce((a, v) => {
        var [start, ends] = v.split(' = ');
        if (start[2] === 'A') starts.push(start);
        var [L, R] = ends.substring(1, ends.length - 1).split(', ');
        a[start] = {
            L,
            R,
        };
        return a;
    }, {});

    var factors = [];

    for (var current of starts) {
        var iter = 0;
        var stop = false;
        while (!stop) {
            for (var step of steps) {
                iter++;
                current = graph[current][step];
                if (current[2] === 'Z') {
                    factors.push(iter);
                    stop = true;
                    break;
                }
            }
        }
    }

    factors.sort((a, b) => a - b);

    var factor = 1;

    for (var i = factors[0]; i > 0; i--) {
        if (factors.every(f => f % i === 0)) {
            factors = factors.map(f => f / i);
            factor *= i;
        }
    }

    var result = factors.reduce((a, v) => a * v, 1) * factor;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
