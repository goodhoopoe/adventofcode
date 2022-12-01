const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let result = 0;
    let [nums, ...boards] = data.split(utils.DOUBLE_LINE_BREAK);
    nums = nums.split(',');
    boards = boards.map(s => s.split(utils.LINE_BREAK).join(' ').split(/[ ]+/));

    let num, board;
    let won = new Set();
    for (num of nums) {
        for (let b = 0; b < boards.length; b++) {
            if (won.has(b)) continue;
            board = boards[b];
            for (let i = 0; i < board.length; i++) {
                if (board[i] === num) {
                    board[i] = undefined;
                }
            }

            // validate row
            for (let i = 0; i < 5; i++) {
                let count = 0;
                for (let j = 0; j < 5; j++) {
                    if (board[i * 5 + j] === undefined) count++;
                }

                if (count === 5) {
                    won.add(b);
                }
            }

            for (let i = 0; i < 5; i++) {
                let count = 0;
                for (let j = 0; j < 5; j++) {
                    if (board[j * 5 + i] === undefined) count++;
                }

                if (count === 5) {
                    won.add(b);
                }
            }
        }

        if (won.size === boards.length) break;
    }
    result = board.reduce((acc, val) => (acc += +(val ?? 0)), result) * num;
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
