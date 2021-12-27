const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));

    const m = data.length;
    const n = data[0].length;
    let step = 0;

    while (true) {
        let moved = false;
        let ableToMove = [];
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                const nextPosition = (j + 1) % n;

                if (data[i][j] === '>' && data[i][nextPosition] === '.') {
                    ableToMove.push([i, j, nextPosition]);
                }
            }
        }

        ableToMove.forEach(([i, j, nextPosition]) => {
            data[i][nextPosition] = '>';
            data[i][j] = '.';
            moved = true;
        });

        ableToMove = [];

        for (let j = 0; j < n; j++) {
            for (let i = 0; i < m; i++) {
                const nextPosition = (i + 1) % m;

                if (data[i][j] === 'v' && data[nextPosition][j] === '.') {
                    ableToMove.push([i, j, nextPosition]);
                    moved = true;
                }
            }
        }

        ableToMove.forEach(([i, j, nextPosition]) => {
            data[nextPosition][j] = 'v';
            data[i][j] = '.';
            moved = true;
        });

        step++;

        if (!moved) {
            break;
        }
    }

    const result = step;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
