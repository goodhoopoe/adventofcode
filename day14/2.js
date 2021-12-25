const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    let [source, transformations] = data.split(utils.DOUBLE_LINE_BREAK);

    transformations = transformations
        .split(utils.LINE_BREAK)
        .map(line => line.split(' -> '));

    let pairs = new Map();
    const letters = {};

    for (let i = 0; i < source.length - 1; i++) {
        const pair = source[i] + source[i + 1];
        if (!pairs.has(pair)) {
            pairs.set(pair, 0);
        }

        pairs.set(pair, pairs.get(pair) + 1);
    }

    for (let i = 0; i < source.length; i++) {
        if (!letters[source[i]]) {
            letters[source[i]] = 0;
        }
        letters[source[i]]++;
    }

    for (let i = 0; i < 40; i++) {
        const newMap = new Map();
        for (const [start, end] of transformations) {
            const value = pairs.get(start);
            if (value === undefined) continue;
            pairs.delete(start);

            newMap.set(
                start[0] + end,
                (newMap.get(start[0] + end) ?? 0) + value
            );
            newMap.set(
                end + start[1],
                (newMap.get(end + start[1]) ?? 0) + value
            );
            if (!letters[end]) {
                letters[end] = 0;
            }
            letters[end] += value;
        }

        pairs.forEach((value, key) => newMap.set(key, value));

        pairs = newMap;
    }

    const max = Math.max(...Object.values(letters));
    const min = Math.min(...Object.values(letters));

    const result = max - min;

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
