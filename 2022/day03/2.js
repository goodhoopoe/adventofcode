const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;

    for (var i = 0; i < data.length; i += 3) {
        var first = new Set(data[i]);
        var second = new Set(data[i + 1]);
        var third = new Set(data[i + 2]);
        var common = [...first]
            .filter(item => second.has(item))
            .filter(item => third.has(item));

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
