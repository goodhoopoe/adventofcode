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
                    return { condition: () => true, target: command[0] };
                }

                return {
                    target: command[1],
                    condition: data => {
                        var value = data[command[0][0]];
                        var compareValue = Number(command[0].substring(2));

                        if (command[0][1] === '>') {
                            return value > compareValue;
                        }

                        return value < compareValue;
                    },
                };
            });
            a[v[0]] = conditions;

            return a;
        }, {});

    var values = data[1].map(line =>
        line
            .split(/[{}]/g)[1]
            .split(',')
            .map(block => block.split('='))
            .reduce((a, v) => {
                a[v[0]] = Number(v[1]);
                return a;
            }, {})
    );

    var result = 0;

    for (var value of values) {
        var current = 'in';

        while (current !== 'A' && current !== 'R') {
            for (var block of commands[current]) {
                if (block.condition(value)) {
                    current = block.target;
                    break;
                }
            }
        }

        if (current === 'A') {
            result += Object.values(value).reduce((a, v) => a + v, 0);
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
