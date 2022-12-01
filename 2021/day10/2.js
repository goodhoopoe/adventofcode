const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time('O(N)');
    data = data.split(utils.LINE_BREAK);
    let result = [];
    const mapping = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4,
    };

    for (const line of data) {
        const stack = [];
        let invalid = false;
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

            invalid = true;
            break;
        }
        if (invalid) continue;
        let sum = 0;
        while (stack.length) {
            sum = sum * 5 + mapping[stack.pop()];
        }

        result.push(sum);
    }

    result.sort((a, b) => a - b);
    const mid = Math.trunc((result.length + 1) / 2) - 1;

    console.timeEnd('O(N)');
    console.log(result[mid]);
})(process.argv[1]);
