const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var cache = {};

    for (var line of data) {
        var [info, cards] = line.split(':');
        var gameNum = +info.split(/\s+/)[1];
        var [winningCards, allCards] = cards
            .trim()
            .split('|')
            .map(line => new Set(line.trim().split(/\s+/)));
        var wins = 0;
        for (var winningCard of winningCards) {
            if (allCards.has(winningCard)) {
                wins++;
            }
        }

        if (!cache[gameNum]) cache[gameNum] = 1;
        var winningCardCount = cache[gameNum];
        for (var i = 1; i < wins + 1; i++) {
            if (!cache[gameNum + i]) cache[gameNum + i] = 1;
            cache[gameNum + i] += winningCardCount;
        }
    }

    var result = Object.values(cache).reduce((a, v) => a + +v, 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
