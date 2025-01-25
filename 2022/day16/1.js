const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = undefined;
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK);

    var adj = {};

    for (var line of data) {
        var key = line.substring(6, 8);
        var rest;
        var [dirtyRate, rest] = line.split(';');
        var rate = +dirtyRate.split('=')[1];
        var valves = rest.split(/valves? /)[1].split(', ');
        adj[key] = { rate, valves };
    }

    var minutes = 30;
    var result = -Infinity;
    var q = [{ key: 'AA', isOpening: false, rate: 0, cache: new Set() }];

    while (minutes > 0) {
        console.log('_________minutes ' + minutes, q.length);
        var newQ = [];

        for (var obj of q) {
            // console.log(JSON.stringify(obj));
            if (!obj.isOpening && !obj.cache.has(obj.key)) {
                // console.log({ minutes, open: obj.isOpening, cache: obj.cache });
                var tempRate = obj.rate + (minutes - 1) * adj[key].rate;

                result = Math.max(result, tempRate);

                newQ.push({
                    ...obj,
                    isOpening: true,
                    rate: tempRate,
                    cache: new Set([...obj.cache, obj.key]),
                });
            }

            for (var nextValve of adj[obj.key].valves ?? []) {
                newQ.push({
                    ...obj,
                    isOpening: false,
                    key: nextValve,
                    cache: new Set([...obj.cache]),
                });
            }
        }

        var q = newQ;
        minutes--;
    }

    // function dfs(key, isOpening, rate, time) {
    //     console.log({ key, isOpening, rate, time });
    //     if (time === 0) {
    //         result = Math.max(result, rate);
    //         return;
    //     }

    //     if (!isOpening) {
    //         dfs(key, true, rate, time - 1);
    //     }

    //     for (var nextValve of adj[key].valves ?? []) {
    //         cache.add(nextValve);
    //         var tempRate = cache.has(nextValve) ? rate : rate + time * adj[key];
    //         dfs(nextValve, false, tempRate, time - 1);

    //         cache.delete(nextValve);
    //     }
    // }

    // dfs('AA', false, 0, 30);

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
