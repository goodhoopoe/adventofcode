const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;

    for (var line of data) {
        var [info, cards] = line.split(':');
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
        if (wins) {
            result += 1 << (wins - 1);
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
