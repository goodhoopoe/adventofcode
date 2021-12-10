const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(N)');
    data = data.split(utils.LINE_BREAK);
    let result = 0;
    const mapping = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };
    for (const line of data) {
        const stack = [];

        for (const char of line) {
            if (['(', '{', '[', '<'].indexOf(char) > -1) {
                stack.push(char);
                continue;
            }

            if (char === ')' && stack[stack.length - 1] === '(') {
                stack.pop();
                continue;
            }

            if (char === ']' && stack[stack.length - 1] === '[') {
                stack.pop();
                continue;
            }

            if (char === '}' && stack[stack.length - 1] === '{') {
                stack.pop();
                continue;
            }

            if (char === '>' && stack[stack.length - 1] === '<') {
                stack.pop();
                continue;
            }

            result += mapping[char];
            break;
        }
    }

    console.timeEnd('O(N)');
    console.log(result);
})(process.argv[1]);
