const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);

    const steps = data[0].split('');

    const graph = data[1].split(utils.LINE_BREAK).reduce((a, v) => {
        var [start, ends] = v.split(' = ');
        var [L, R] = ends.substring(1, ends.length - 1).split(', ');
        a[start] = {
            L,
            R,
        };
        return a;
    }, {});

    var result = 0;
    var current = 'AAA';
    var stop = false;
    while (!stop) {
        for (var step of steps) {
            result++;
            current = graph[current][step];
            if (current === 'ZZZ') {
                stop = true;
                break;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
