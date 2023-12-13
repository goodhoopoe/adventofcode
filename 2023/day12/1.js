const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;

    function dfs(steps, current, questionMarks, iter, replaceCount, n) {
        // console.log({ iter, replaceCount, n, current: current.join('') });

        if (replaceCount === n) {
            validate(steps, current);
            return;
        }

        for (var i = iter; i < questionMarks.length; i++) {
            var index = questionMarks[i];

            current[index] = '.';
            dfs(steps, current, questionMarks, i + 1, replaceCount + 1, n);
            current[index] = '?';
        }
    }

    function validate(validCount, current) {
        var d = current;
        var current = current
            .join('')
            .split(/\.+/)
            .filter(Boolean)
            .map(val => val.length);

        if (current.length !== validCount.length) return;
        // console.log('validating', validCount, current, d.join(''));

        for (var i = 0; i < current.length; i++) {
            if (validCount[i] !== current[i]) {
                return;
            }
        }

        result++;
    }

    for (var line of data) {
        var [field, steps] = line.split(' ');
        field = field.split('');
        steps = steps.split(',').map(Number);

        var symbolsArray = field.reduce(
            (a, v, i) => {
                a[v].push(i);
                return a;
            },
            { '.': [], '#': [], '?': [] }
        );

        // console.log(symbolsArray);

        var totalAmount = steps.reduce((a, v) => a + v, 0);
        const replaceCount =
            symbolsArray['#'].length + symbolsArray['?'].length - totalAmount;

        if (replaceCount < 0) continue;

        dfs(steps, field, symbolsArray['?'], 0, 0, replaceCount);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
