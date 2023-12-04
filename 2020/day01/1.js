const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(val => +val);

    var result = 0;

    var set = new Set();

    for (var value of data) {
        if (set.has(2020 - value)) {
            result = value * (2020 - value);
        } else {
            set.add(value);
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
