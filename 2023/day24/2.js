const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK);

    for (var i = 0; i < data.length; i++) {
        var line = data[i];
        var [px, py, pz, _, vx, vy, vz] = line.split(/[,]?\s+/g).map(Number);
        var k, b;
        var x0 = px;
        var y0 = py;
        var x1 = px + vx;
        var y1 = py + vy;
        var k = (y1 - y0) / (x1 - x0);
        var b = y0 - k * x0;

        data[i] = { px, py, pz, vx, vy, vz, k, b };
    }

    var collisions = [];

    for (var i = 0; i < data.length - 1; i++) {
        var first = data[i];
        for (var j = i + 1; j < data.length; j++) {
            var second = data[j];
            var interX = (second.b - first.b) / (first.k - second.k);
            var interY = first.k * interX + first.b;

            var tx1 = (interX - first.px) / first.vx;

            var tx2 = (interX - second.px) / second.vx;

            if (tx1 >= 0 && tx2 >= 0) {
                collisions.push({
                    intersection: [interX, interY],
                    stones: [i, j],
                });
            }
        }
    }

    var result = collisions.reduce((a, v) => {
        if (
            MIN_X <= v.intersection[0] &&
            v.intersection[0] <= MAX_X &&
            MIN_Y <= v.intersection[1] &&
            v.intersection[1] <= MAX_Y
        ) {
            a++;
        }
        return a;
    }, 0);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
