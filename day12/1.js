const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    const adj = {};
    data.split(utils.LINE_BREAK).forEach(line => {
        const [first, second] = line.split('-');

        if (!adj[first]) {
            adj[first] = [];
        }
        adj[first].push(second);

        if (!adj[second]) {
            adj[second] = [];
        }
        adj[second].push(first);
    });

    let result = 0;
    const cache = new Set('start');
    const dfs = cave => {
        if (cave === 'end') {
            result++;
            return;
        }

        if (cave.toLowerCase() === cave) {
            cache.add(cave);
        }

        adj[cave].forEach(destination => {
            if (!cache.has(destination)) {
                dfs(destination);
            }
        });

        cache.delete(cave);
    };

    dfs('start');

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
