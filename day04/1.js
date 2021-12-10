const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let result = 0;
    let [nums, ...boards] = data.split(utils.DOUBLE_LINE_BREAK);
    nums = nums.split(',');
    boards = boards.map(s => s.split(utils.LINE_BREAK).join(' ').split(/[ ]+/));

    let num, board;
    let stop = false;

    for (num of nums) {
        for (board of boards) {
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
                    stop = true;
                    break;
                }
            }

            if (stop) break;

            for (let i = 0; i < 5; i++) {
                let count = 0;
                for (let j = 0; j < 5; j++) {
                    if (board[j * 5 + i] === undefined) count++;
                }

                if (count === 5) {
                    stop = true;
                    break;
                }
            }
        }

        if (stop) break;
    }
    result = board.reduce((acc, val) => (acc += +(val ?? 0)), result) * num;
    console.timeEnd();
    console.log(result);
})(process.argv[1]);
