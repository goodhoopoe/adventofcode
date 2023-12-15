const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    data = data.split(utils.LINE_BREAK).map(line => line.split(','))[0];

    var result = 0;
    var boxes = Array(256)
        .fill(0)
        .map(() => []);

    for (var step of data) {
        var boxNumber = 0;
        var isRemoving = step.at(-1) === '-';
        var isAdding = step.split('=').length === 2;
        var [command, lense] = step.split('=');
        var [hashedBox] = step.split(/[=-]/);
        for (var char of hashedBox) {
            var code = char.charCodeAt(0);

            boxNumber = ((boxNumber + code) * 17) % 256;
        }

        if (isAdding) {
            var possibleReplace = boxes[boxNumber].find(
                currentLense => currentLense[0] === hashedBox
            );

            if (possibleReplace) {
                possibleReplace[1] = lense;
            } else {
                boxes[boxNumber].push([hashedBox, lense]);
            }
        }

        if (isRemoving) {
            var possibleDeletion = boxes[boxNumber].findIndex(
                currentLense => currentLense[0] === hashedBox
            );

            if (possibleDeletion !== -1) {
                boxes[boxNumber].splice(possibleDeletion, 1);
            }
        }
    }

    var result = 0;

    for (var i = 0; i < boxes.length; i++) {
        for (var j = 0; j < boxes[i].length; j++) {
            result += (i + 1) * (j + 1) * Number(boxes[i][j][1]);
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
