const utils = require('../utils');

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

    for (let i = 0; i < folds.length; i++) {
        const [dir, value] = folds[i];
        dots = dots.map(([x, y]) => {
            if (dir === 'x') {
                return [x, y > value ? value - (y - value) : y];
            } else {
                return [x > value ? value - (x - value) : x, y];
            }
        });
    }

    const matrix = [];
    const maxX = Math.max(...dots.map(([x]) => x));
    const maxY = Math.max(...dots.map(([x, y]) => y));

    for (let i = 0; i <= maxX; i++) {
        matrix.push(Array(maxY + 1).fill(' '));
    }

    for (const [x, y] of dots) {
        matrix[x][y] = '#';
    }

    console.timeEnd();
    console.log(matrix.map(line => line.join('')).join('\n'));
})(process.argv[1]);
