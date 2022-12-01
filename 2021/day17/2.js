const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data
        .split(utils.LINE_BREAK)
        .map(el => el.split(',').map(val => +val));
    const x1 = 281,
        x2 = 311,
        y1 = -74,
        y2 = -54;

    let result = 0;
    for (let vx = 0; vx <= x2; vx++) {
        for (let vy = -y1; vy >= y1; vy--) {
            let x = 0,
                y = 0;
            let curX = vx;
            let curY = vy;
            while (x <= x2 && y >= y1) {
                x += curX;
                y += curY;
                if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                    result++;
                    break;
                }
                if (curX > 0) curX--;
                curY--;
            }
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
