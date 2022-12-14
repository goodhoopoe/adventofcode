const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    var MODULO = 1;

    data = data.split(utils.DOUBLE_LINE_BREAK).map((block, i) => {
        var lines = block.split(utils.LINE_BREAK);
        var obj = {};
        obj.levels = lines[1]
            .split('Starting items: ')[1]
            .split(', ')
            .map(v => +v);
        obj.operation = lines[2].split('Operation: new = ')[1].split(' ');
        obj.divisibleTest = +lines[3].match(/[\d]+/g)[0];
        MODULO *= obj.divisibleTest;
        obj.testTrue = +lines[4].match(/[\d]+/g)[0];
        obj.testFalse = +lines[5].match(/[\d]+/g)[0];
        obj.inspectCount = 0;

        return obj;
    });

    var round = 0;

    while (round++ < 10000) {
        for (var monkey of data) {
            for (var oldLevel of monkey.levels) {
                var newItemLevel = increaseItemLevel(
                    oldLevel,
                    monkey.operation,
                    MODULO
                );
                // console.log(newItemLevel);
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

    function increaseItemLevel(oldLevel, op, MODULO) {
        return eval(op.join(' ').replaceAll('old', oldLevel % MODULO));
    }

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
