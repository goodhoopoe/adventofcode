const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data
        .split(utils.DOUBLE_LINE_BREAK)
        .map(block => block.split(utils.LINE_BREAK));

    const commands = data[0]
        .map(line => line.split(/[{}]/g))
        .reduce((a, v) => {
            var conditions = v[1].split(',').map(block => {
                var command = block.split(':');

                if (command.length === 1) {
                    return {
                        condition: () => true,
                        split: data => [data],
                        target: command[0],
                    };
                }

                return {
                    target: command[1],
                    split: ranges => {
                        var sign = command[0][1];
                        var compareValue = Number(command[0].substring(2));
                        var [start, end] = ranges[command[0][0]];
                        var result;
                        if (sign === '>') {
                            if (start <= compareValue && compareValue < end) {
                                result = [
                                    [start, compareValue],
                                    [compareValue + 1, end],
                                ];
                            } else {
                                result = [[start, end]];
                            }
                        }
                        if (sign === '<') {
                            if (start < compareValue && compareValue <= end) {
                                result = [
                                    [start, compareValue - 1],
                                    [compareValue, end],
                                ];
                            } else {
                                result = [[start, end]];
                            }
                        }

                        return result.map(interval => ({
                            x: [...ranges.x],
                            m: [...ranges.m],
                            a: [...ranges.a],
                            s: [...ranges.s],
                            [command[0][0]]: interval,
                        }));
                    },
                    condition: range => {
                        var compareValue = Number(command[0].substring(2));
                        var [start, end] = range[command[0][0]];

                        if (command[0][1] === '>') {
                            return compareValue <= start && compareValue <= end;
                        }

                        return start <= compareValue && end <= compareValue;
                    },
                };
            });
            a[v[0]] = conditions;

            return a;
        }, {});

    var result = 0;

    function dfs(current, data) {
        if (current === 'A') {
            return Object.values(data).reduce(
                (a, [start, end]) => a * (end - start + 1),
                1
            );
        }

        var result = 0;

        if (current === 'R') return 0;

        for (var block of commands[current]) {
            var newRanges = block.split(data);
            for (var newRange of newRanges) {
                if (block.condition(newRange)) {
                    result += dfs(block.target, newRange);
                } else {
                    data = newRange;
                }
            }
        }

        return result;
    }

    var count = dfs('in', {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
    });

    result += count;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
