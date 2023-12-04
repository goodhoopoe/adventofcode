const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(n^2)');
    data = data.split(utils.LINE_BREAK).map(val => +val);

    data.sort((a, b) => a - b);
    var result = 0;

    for (let i = 0; i < data.length - 2; i++) {
        var left = i + 1;
        var right = data.length - 1;
        while (left < right) {
            var temp = data[i] + data[left] + data[right];
            if (temp === 2020) {
                result = data[i] * data[left] * data[right];
                break;
            }
            if (temp > 2020) {
                right--;
            } else {
                left++;
            }
        }
    }

    console.timeEnd('O(n^2)');
    console.log(result);
})(process.argv[1]);
