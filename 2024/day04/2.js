const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(''));
    var words = ['MAS', 'SAM'];
    var result = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
            var firstWord = [
                data[i][j],
                data[i + 1]?.[j + 1],
                data[i + 2]?.[j + 2],
            ]
                .filter(Boolean)
                .join('');
            var secondWord = [
                data[i + 2]?.[j],
                data[i + 1]?.[j + 1],
                data[i]?.[j + 2],
            ]
                .filter(Boolean)
                .join('');

            if (words.includes(firstWord) && words.includes(secondWord))
                result++;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
