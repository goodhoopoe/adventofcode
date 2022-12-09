const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK);

    var SIZE_LIMIT = 100000;
    function createDir(_name) {
        return {
            _dirs: {},
            _files: [],
            _size: 0,
            _name,
        };
    }
    var tree = createDir('/');
    var stack = [tree];
    var result = 0;

    for (var line of data) {
        if (line[0] === '$') {
            var [_, command, dir] = line.split(' ');

            if (command === 'cd') {
                if (dir === '/') {
                    stack = [tree];
                } else if (dir === '..') {
                    stack.pop();
                } else {
                    stack.push(stack.at(-1)._dirs[dir]);
                }
            }
        } else {
            var dir = stack.at(-1);
            var [sizeOrDir, name] = line.split(' ');
            if (sizeOrDir === 'dir') {
                dir._dirs[name] = createDir(name);
            } else {
                dir._files.push(+sizeOrDir);
            }
        }
    }

    function dfs(head) {
        var size = 0;

        for (var dir of Object.values(head._dirs)) {
            size += dfs(dir);
        }

        size += head._files.reduce((acc, val) => acc + val, 0);

        if (size < SIZE_LIMIT) {
            result += size;
        }

        head._size = size;

        return size;
    }

    dfs(tree);

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
