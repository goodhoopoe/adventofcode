const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(el => +el);
    let result = 0;
    for (let i = 0; i < data.length - 3; i++) {
        if (data[i] < data[i + 3]) result++;
    }
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
