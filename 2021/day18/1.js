const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(parse);

    let arr = [];

    for (let i = 0; i < data.length; i++) {
        if (arr.length === 0) {
            arr = data[i];
        } else {
            arr = arr
                .map(el => [el[0], el[1] + 1])
                .concat(data[i].map(el => [el[0], el[1] + 1]));
        }
        while (1) {
            let explode = false;
            for (let j = 0; j < arr.length; j++) {
                const [num, count] = arr[j];
                if (count === 5) {
                    if (j > 0) {
                        arr[j - 1][0] += num;
                    }

                    if (j < arr.length - 2) {
                        const [right] = arr[j + 1];
                        arr[j + 2][0] += right;
                    }

                    arr.splice(j, 2, [0, count - 1]);

                    explode = true;
                    break;
                }
            }

            if (explode) continue;
            let split = false;

            for (let j = 0; j < arr.length; j++) {
                const [num, count] = arr[j];

                if (num > 9) {
                    const left = Math.floor(num / 2);
                    const right = num - left;

                    arr.splice(j, 1, [left, count + 1], [right, count + 1]);

                    split = true;
                    break;
                }
            }

            if (!split) break;
        }
    }

    const result = countMagnitude(arr);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);

function parse(line) {
    const result = [];
    let count = 0;

    for (const char of line) {
        if (char === '[') {
            count++;
        } else if (char === ']') {
            count--;
        } else if (!isNaN(+char)) {
            result.push([+char, count]);
        }
    }

    return result;
}

function countMagnitude(arr) {
    while (arr.length > 2) {
        const max = Math.max(...arr.map(el => el[1]));

        for (let i = 0; i < arr.length; i++) {
            const [num, count] = arr[i];
            if (count !== max) continue;

            arr.splice(i, 2, [arr[i][0] * 3 + arr[i + 1][0] * 2, count - 1]);
        }
    }

    return arr[0][0] * 3 + arr[1][0] * 2;
}
