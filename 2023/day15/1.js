const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(','))[0];

    var result = 0;

    for (var step of data) {
        var value = 0;
        for (var char of step) {
            var code = char.charCodeAt(0);

            value = ((value + code) * 17) % 256;
        }

        result += value;
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
