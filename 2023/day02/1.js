const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    const RED = 12;
    const GREEN = 13;
    const BLUE = 14;

    var result = data
        .map(line => {
            const [prefix, postfix] = line.split(': ');
            var gameNum = +prefix.split(' ')[1];

            var [red, green, blue] = postfix.split('; ').reduce(
                (arr, block) => {
                    block.split(', ').forEach(singleTry => {
                        var [countStr, realColor] = singleTry.split(' ');
                        if (realColor === 'red') {
                            arr[0] = Math.max(arr[0], +countStr);
                        }
                        if (realColor === 'green') {
                            arr[1] = Math.max(arr[1], +countStr);
                        }
                        if (realColor === 'blue') {
                            arr[2] = Math.max(arr[2], +countStr);
                        }
                    });

                    return arr;
                },
                [-Infinity, -Infinity, -Infinity]
            );

            if (red <= RED && green <= GREEN && blue <= BLUE) {
                return gameNum;
            }

            return 0;
        })
        .reduce((a, v) => a + v, 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
