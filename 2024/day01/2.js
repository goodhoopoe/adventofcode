const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;
    var arr = [];
    var counter = {};
    for (var line of data) {
        var [first, second] = line.split(/\s+/).map(v => +v);
        arr.push(first);
        if (!counter[second]) counter[second] = 0;
        counter[second]++;
    }

    for (var i = 0; i < arr.length; i++) {
        result += arr[i] * (counter[arr[i]] ?? 0)
    }


    console.timeEnd();
    console.log(result);
})(process.argv[1]);
