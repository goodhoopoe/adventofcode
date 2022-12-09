const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    var i = 0;
    var cache = new Set();
    var result;

    var amountOfDifferentChars = 14;

    while (i < data.length) {
        if (cache.size === amountOfDifferentChars) {
            result = i;
            break;
        }
        if (!cache.has(data[i])) {
            cache.add(data[i]);
            i++;
            continue;
        }
        cache.delete(data[i - cache.size]);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
