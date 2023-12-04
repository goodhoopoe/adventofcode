const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(val => val.split(/[:]?[ ]/));

    var result = 0;

    for (var [pos, char, password] of data) {
        var chars = [...password].reduce((a, v) => {
            if (!a[v]) a[v] = 0;
            a[v]++;
            return a;
        }, {});
        var [left, right] = pos.split('-').map(val => +val);

        if (left <= chars[char] && chars[char] <= right) {
            result++;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
