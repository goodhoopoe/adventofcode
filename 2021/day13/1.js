const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let [dots, folds] = data.split(utils.DOUBLE_LINE_BREAK);

    dots = dots.split(utils.LINE_BREAK).map(line => {
        const [x, y] = line.split(',').map(el => +el);
        return [y, x];
    });

    folds = folds.split(utils.LINE_BREAK).map(line => {
        let [along, value] = line.split('=');
        return [along[along.length - 1], +value];
    });

    for (let i = 0; i <= 0; i++) {
        const [dir, value] = folds[i];
        dots = dots.map(([x, y]) => {
            if (dir === 'x') {
                return [x, y > value ? value - (y - value) : y];
            } else {
                return [x > value ? value - (x - value) : x, y];
            }
        });
    }

    const result = new Set(dots.map(([x, y]) => x + '_' + y)).size;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
