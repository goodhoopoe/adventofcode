const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
