const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);
    var listOfCards = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'];
    var cards = Object.fromEntries(listOfCards.map((val, i) => [val, i]));

    data = data
        .map(val => val.split(' '))
        .sort(([a], [b]) => {
            var combA = calculateCombination(a);
            var combB = calculateCombination(b);
            if (combA !== combB) return combA - combB;
            for (var i = 0; i < a.length; i++) {
                if (a[i] === b[i]) continue;
                return cards[a[i]] - cards[b[i]];
            }
        });

    function calculateCombination(str) {
        var obj = [...str].reduce((a, v) => {
            if (!a[v]) a[v] = 0;
            a[v]++;
            return a;
        }, {});

        var combination = Object.values(obj).sort((a, b) => b - a);

        if (combination[0] === 5) return 6;
        if (combination[0] === 4) return 5;
        if (combination[0] === 3) {
            if (combination[1] === 2) return 4;
            return 3;
        }
        if (combination[0] === 2) {
            if (combination[1] === 2) return 2;
            return 1;
        }
        return 0;
    }

    var result = data.reduce((a, v, i) => a + v[1] * (i + 1), 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
