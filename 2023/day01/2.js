const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var mapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };
    var mappingArray = Object.entries(mapping);
    var power = data
        .map(line => {
            var lo = [];

            for (var i = 0; i < line.length; i++) {
                var char = line[i];
                if (!isNaN(+char)) {
                    lo = [i, +char];
                    break;
                }
            }

            for (var tuple of mappingArray) {
                var index = line.indexOf(tuple[0]);
                if (index !== -1) {
                    if (index < (lo[0] ?? +Infinity)) {
                        lo = [index, tuple[1]];
                    }
                }
            }

            var hi = [];

            for (var i = line.length - 1; i >= 0; i--) {
                var char = line[i];
                if (!isNaN(+char)) {
                    hi = [i, +char];
                    break;
                }
            }

            for (var tuple of mappingArray) {
                var index = line.lastIndexOf(tuple[0]);
                if (index !== -1) {
                    if (index > (hi[0] ?? -Infinity)) {
                        hi = [index, tuple[1]];
                    }
                }
            }

            return [lo, hi];
        })
        .reduce((a, v) => a + +`${v[0][1]}${v[1][1]}`, 0);

    console.timeEnd();
    console.log(power);
})(process.argv[1]);
