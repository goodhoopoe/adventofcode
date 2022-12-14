const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var result = '';
    var i = 0;
    var cyclesCount = 0;
    var x = 1;
    var isSecondPartOfAdd = false;
    while (cyclesCount < 239) {
        cyclesCount++;
        if ((cyclesCount - 1) % 40 === 0) {
            result += '\n';
        }
        var column = cyclesCount % 40;

        result += [x + 2, x, x + 1].includes(column) ? '#' : '.';
        var [command, value] = data[i];
        if (isSecondPartOfAdd) {
            x += +value;
            isSecondPartOfAdd = false;
            i++;
        } else {
            if (command === 'addx') {
                isSecondPartOfAdd = true;
            } else {
                i++;
            }
        }
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
