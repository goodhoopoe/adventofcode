const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.DOUBLE_LINE_BREAK).map((block, i) => {
        var lines = block.split(utils.LINE_BREAK);
        var obj = {};
        obj.levels = lines[1]
            .split('Starting items: ')[1]
            .split(', ')
            .map(v => +v);
        obj.operation = lines[2].split('Operation: new = ')[1].split(' ');
        obj.divisibleTest = +lines[3].match(/[\d]+/g)[0];
        obj.testTrue = +lines[4].match(/[\d]+/g)[0];
        obj.testFalse = +lines[5].match(/[\d]+/g)[0];
        obj.inspectCount = 0;

        return obj;
    });

    var round = 0;

    while (round++ < 20) {
        for (var monkey of data) {
            for (var oldLevel of monkey.levels) {
                var newItemLevel = Math.trunc(
                    increaseItemLevel(oldLevel, monkey.operation) / 3
                );
                if (newItemLevel % monkey.divisibleTest === 0) {
                    data[monkey.testTrue].levels.push(newItemLevel);
                } else {
                    data[monkey.testFalse].levels.push(newItemLevel);
                }
                monkey.inspectCount++;
            }
            monkey.levels = [];
        }
    }

    var result = data
        .reduce((acc, val) => {
            acc.push(val.inspectCount);
            return acc;
        }, [])
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((acc, val) => acc * val, 1);

    function increaseItemLevel(oldLevel, op) {
        return eval(op.join(' ').replaceAll('old', oldLevel));
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
