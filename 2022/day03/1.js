const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;

    for (var line of data) {
        var n = line.length / 2;

        var first = new Set([...line].slice(0, n));
        var second = new Set([...line].slice(n));
        var common = [...first].filter(item => second.has(item));

        common.forEach(item => {
            var score = countScore(item);
            result += score;
        });
    }

    function countScore(item) {
        if (item.toLowerCase() === item.toUpperCase()) {
            throw new Error('Item is not a letter');
        }
        if (item === item.toLowerCase()) {
            return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        }

        if (item === item.toUpperCase()) {
            return item.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
