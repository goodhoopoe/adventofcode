const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK);
    var stacks = data[0]
        .split(utils.LINE_BREAK)
        .reduceRight((acc, val) => {
            for (var i = 1; i < val.length; i += 4) {
                var stackIndex = Math.trunc(i / 4);
                if (!acc[stackIndex]) acc[stackIndex] = [];
                if (val[i] !== ' ') acc[stackIndex].push(val[i]);
            }
            return acc;
        }, [])
        .map(stack => stack.slice(1));

    var operations = data[1]
        .split(utils.LINE_BREAK)
        .map(line => line.split(/[^\d]/g).filter(Boolean));

    for (var [count, from, to] of operations) {
        var queue = [];
        for (var i = 0; i < count; i++) {
            if (stacks[from - 1].length === 0) break;
            queue.push(stacks[from - 1].pop());
        }
        queue.reverse();
        stacks[to - 1].push(...queue);
    }

    var result = stacks.map(stack => stack.slice(-1)[0]).join('');

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
