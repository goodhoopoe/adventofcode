const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK).map(line => line.split(' '));

    var result = 0;
    var i = 0;
    var cyclesCount = 0;
    var x = 1;
    var isSecondPartOfAdd = false;
    while (cyclesCount <= 220) {
        cyclesCount++;
        if ((cyclesCount + 20) % 40 === 0) {
            result += x * cyclesCount;
        }
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
