const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(N)');
    const unique = new Set([2, 3, 4, 7]);
    let result = 0;
    data.split(utils.LINE_BREAK).forEach(line =>
        line
            .split(' | ')[1]
            .split(' ')
            .forEach(el => (unique.has(el.length) ? result++ : undefined))
    );
    console.timeEnd('O(N)');
    console.log(result);
})(process.argv[1]);
