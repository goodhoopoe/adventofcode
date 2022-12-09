const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    var COMPLEXITY = 'O(N)';
    console.time(COMPLEXITY);

    data = data.split(utils.LINE_BREAK);

    var LIMIT = 40000000;
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
    var result = +Infinity;

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

    function computesSizesDfs(head) {
        var size = 0;

        for (var dir of Object.values(head._dirs)) {
            size += computesSizesDfs(dir);
        }

        size += head._files.reduce((acc, val) => acc + val, 0);

        head._size = size;

        return size;
    }

    function findBestDirToDeleteDfs(head) {
        if (head._size > diff) {
            result = Math.min(result, head._size);
        }

        for (var dir of Object.values(head._dirs)) {
            findBestDirToDeleteDfs(dir);
        }
    }

    var diff = computesSizesDfs(tree) - LIMIT;
    findBestDirToDeleteDfs(tree);

    console.timeEnd(COMPLEXITY);
    console.log(result);
})(process.argv[1]);
