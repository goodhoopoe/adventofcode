const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(val => val.split(/[:]?[ ]/));

    var result = 0;

    for (var [pos, char, password] of data) {
        result += Number(
            pos.split('-').filter(pos => password[pos - 1] === char).length ===
                1
        );
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
