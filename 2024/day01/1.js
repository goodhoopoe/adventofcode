const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var result = 0;
    var arr1 = [];
    var arr2 = [];
    for (var line of data) {
        var [first, second] = line.split(/\s+/).map(v => +v);
        arr1.push(first);
        arr2.push(second);
    }
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    for (var i = 0; i < arr1.length; i++) {
        result += Math.abs(arr1[i] - arr2[i]);
    }


    console.timeEnd();
    console.log(result);
})(process.argv[1]);
