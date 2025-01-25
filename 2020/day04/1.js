const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.DOUBLE_LINE_BREAK).map(block =>
        block
            .split(utils.LINE_BREAK)
            .map(line => line.split(' '))
            .flat()
            .map(line => line.split(':'))
    );

    var required = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

    var result = 0;

    for (const arr of data) {
        var count = arr.reduce(
            (acc, [key, val]) => acc + Number(required.has(key)),
            0
        );
        if (count >= 7) result++;
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
