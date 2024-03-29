const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let result = 0;
    data = data.split(utils.LINE_BREAK).map(line => line.split(' | '));

    data.forEach(([puzzle, answer]) => {
        puzzle = puzzle.split(' ').map(el => [...el].sort().join(''));
        answer = answer.split(' ').map(el => [...el].sort().join(''));
        const mapping = {};
        const length = puzzle.reduce((acc, val) => {
            if (!acc[val.length]) acc[val.length] = [];
            acc[val.length].push(val);
            return acc;
        }, {});

        const one = length[2][0];
        mapping[one] = 1;

        const four = length[4][0];
        mapping[four] = 4;

        const seven = length[3][0];
        mapping[seven] = 7;

        const eight = length[7][0];
        mapping[eight] = 8;

        const three = length[5].find(
            el => el.indexOf(one[0]) > -1 && el.indexOf(one[1]) > -1
        );
        mapping[three] = 3;
        length[5] = length[5].filter(el => el !== three);

        const nine = length[6].find(el => {
            let count = 0;
            for (let i = 0; i < el.length; i++) {
                for (let j = 0; j < three.length; j++) {
                    if (el[i] === three[j]) count++;
                }
            }

            return count + 1 === el.length;
        });
        mapping[nine] = 9;
        length[6] = length[6].filter(el => el !== nine);

        const five = length[5].find(el => {
            let count = 0;

            for (let i = 0; i < el.length; i++) {
                for (let j = 0; j < nine.length; j++) {
                    if (el[i] === nine[j]) count++;
                }
            }

            return count + 1 === nine.length;
        });
        mapping[five] = 5;
        length[5] = length[5].filter(el => el !== five);

        const two = length[5][0];
        mapping[two] = 2;

        const six = length[6].find(el => {
            let count = 0;

            for (let i = 0; i < el.length; i++) {
                for (let j = 0; j < five.length; j++) {
                    if (el[i] === five[j]) count++;
                }
            }

            return count + 1 === el.length;
        });
        mapping[six] = 6;
        length[6] = length[6].filter(el => el !== six);

        const zero = length[6][0];
        mapping[zero] = 0;
        const temp = +answer.map(el => mapping[el]).join('');
        result += temp;
    });

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
