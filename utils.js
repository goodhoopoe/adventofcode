const { readFileSync } = require('fs');

const readFile = scriptPath => {
    const scriptPathArray = scriptPath.split('/');

    scriptPathArray[scriptPathArray.length - 1] = 'input.txt';

    const path = scriptPathArray.join('/');

    return readFileSync(path, { encoding: 'utf8' });
};

const LINE_BREAK = '\n';
const DOUBLE_LINE_BREAK = '\n\n';

module.exports.readFile = readFile;
module.exports.LINE_BREAK = LINE_BREAK;
module.exports.DOUBLE_LINE_BREAK = DOUBLE_LINE_BREAK;
