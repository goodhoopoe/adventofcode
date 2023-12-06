const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var times = data[0].split(/\s+/).slice(1).map(Number);
    var distances = data[1].split(/\s+/).slice(1).map(Number);

    var result = 1;

    for (var t = 0; t < times.length; t++) {
        var time = times[t];
        var count = 0;
        for (var i = 0; i <= time; i++) {
            if (i * (time - i) > distances[t]) {
                count++;
            }
        }
        result *= count;
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
