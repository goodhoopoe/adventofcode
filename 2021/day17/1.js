const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    const x1 = 281,
        x2 = 311,
        y1 = -74,
        y2 = -54;

    const initialVelocity = Math.abs(y1) - 1;

    result = ((1 + initialVelocity) * initialVelocity) / 2;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
