const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    data = data.split(utils.LINE_BREAK).map(el => +el);
    let result = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i - 1] < data[i]) result++;
    }

    console.log(result);
})(process.argv[1]);
