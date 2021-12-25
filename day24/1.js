const utils = require('../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK);

    for (let i = 1; i <= 9; i++) {
        const val = {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
        };
        for (const line of data) {
            let [operation, ...values] = line.split(' ');

            switch (operation) {
                case 'inp':
                    val[values[0]] = i;
                    break;
                case 'add':
                    if (values[1].toLowerCase() === values[1].toUpperCase()) {
                        val[values[0]] += +values[1];
                    } else {
                        val[values[0]] += +val[values[1]];
                    }
                    break;
                case 'mul':
                    if (values[1].toLowerCase() === values[1].toUpperCase()) {
                        val[values[0]] *= +values[1];
                    } else {
                        val[values[0]] *= +val[values[1]];
                    }
                    break;
                case 'div':
                    if (values[1].toLowerCase() === values[1].toUpperCase()) {
                        val[values[0]] = Math.trunc(
                            val[values[0]] / +values[1]
                        );
                    } else {
                        val[values[0]] = Math.trunc(
                            val[values[0]] / +val[values[1]]
                        );
                    }
                    break;
                case 'mod':
                    if (values[1].toLowerCase() === values[1].toUpperCase()) {
                        val[values[0]] = Math.trunc(
                            val[values[0]] % +values[1]
                        );
                    } else {
                        val[values[0]] = Math.trunc(
                            val[values[0]] % +val[values[1]]
                        );
                    }
                    break;
                case 'eql':
                    if (values[1].toLowerCase() === values[1].toUpperCase()) {
                        val[values[0]] = Number(val[values[0]] === +values[1]);
                    } else {
                        val[values[0]] = Number(
                            val[values[0]] === +val[values[1]]
                        );
                    }
                    break;
            }
        }
        console.log(val);
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);

/*
switch (operation) {
            case 'inp':
                val[values[0]] = 5;
                break;
            case 'add':
                if (values[1].toLowerCase() === values[1].toUpperCase()) {
                    val[values[0]] += +values[1];
                } else {
                    val[values[0]] += +val[values[1]];
                }
                break;
            case 'mul':
                if (values[1].toLowerCase() === values[1].toUpperCase()) {
                    val[values[0]] *= +values[1];
                } else {
                    val[values[0]] *= +val[values[1]];
                }
                break;
            case 'div':
                if (values[1].toLowerCase() === values[1].toUpperCase()) {
                    val[values[0]] = Math.trunc(val[values[0]] / +values[1]);
                } else {
                    val[values[0]] = Math.trunc(
                        val[values[0]] / +val[values[1]]
                    );
                }
                break;
            case 'mod':
                if (values[1].toLowerCase() === values[1].toUpperCase()) {
                    val[values[0]] = Math.trunc(val[values[0]] % +values[1]);
                } else {
                    val[values[0]] = Math.trunc(
                        val[values[0]] % +val[values[1]]
                    );
                }
                break;
            case 'eql':
                if (values[1].toLowerCase() === values[1].toUpperCase()) {
                    val[values[0]] = Number(val[values[0]] === +values[1]);
                } else {
                    val[values[0]] = Number(val[values[0]] === +val[values[1]]);
                }
                break;
        }
*/
