const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    var adj = {};
    var vertexes = new Set();

    for (var line of data) {
        var [start, endAsString] = line.split(': ');
        var ends = endAsString.split(' ');

        if (!adj[start]) adj[start] = [];
        adj[start].push(...ends);
        vertexes.add(start);

        for (var end of ends) {
            if (!adj[end]) adj[end] = [];
            adj[end].push(start);
            vertexes.add(end);
        }
    }

    console.log(adj);
    console.log(vertexes.size);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
