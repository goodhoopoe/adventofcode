const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => {
        let [operation, values] = line.split(' ');
        values = values.split(',').map(block =>
            block
                .split('=')[1]
                .split('..')
                .map(el => +el)
        );

        return [operation, values];
    });

    let set = new Set();

    for (let i = 0; i < 20; i++) {
        for (let x = data[i][1][0][0]; x <= data[i][1][0][1]; x++) {
            for (let y = data[i][1][1][0]; y <= data[i][1][1][1]; y++) {
                for (let z = data[i][1][2][0]; z <= data[i][1][2][1]; z++) {
                    if (data[i][0] === 'on') {
                        set.add(`${x}_${y}_${z}`);
                    } else {
                        set.delete(`${x}_${y}_${z}`);
                    }
                }
            }
        }
    }

    const result = set.size;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
