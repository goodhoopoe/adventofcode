const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    const adj = {};
    const cache = { start: 1 };
    data.split(utils.LINE_BREAK).forEach(line => {
        const [first, second] = line.split('-');
        cache[first] = 0;
        cache[second] = 0;

        if (!adj[first]) {
            adj[first] = [];
        }
        adj[first].push(second);

        if (!adj[second]) {
            adj[second] = [];
        }
        adj[second].push(first);
    });
    cache.start = 2;

    let result = 0;

    const dfs = (cave, visitedSmthTwice) => {
        // console.log(cache);
        if (cave === 'end') {
            result++;
            return;
        }

        if (cave.toLowerCase() === cave) {
            cache[cave]++;
        }
        // console.log(adj[cave]);
        adj[cave].forEach(destination => {
            if (
                (cache[destination] === 1 && !visitedSmthTwice) ||
                cache[destination] === 0
            ) {
                dfs(destination, visitedSmthTwice || cache[destination] === 1);
            }
        });

        if (cave.toLowerCase() === cave) {
            cache[cave]--;
        }
    };

    dfs('start', false);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
