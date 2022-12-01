const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();
    let one = 7,
        two = 6,
        oneSum = 0,
        twoSum = 0,
        isPlayerOne = true,
        counter = 0,
        i = 0;

    while (oneSum < 1000 && twoSum < 1000) {
        i += 3;
        let tempSum = 0;
        tempSum += ++counter;
        counter %= 100;
        tempSum += ++counter;
        counter %= 100;
        tempSum += ++counter;
        counter %= 100;

        if (isPlayerOne) {
            let temp = (one + tempSum) % 10;
            if (temp === 0) temp = 10;
            oneSum += temp;
            one = temp;
        } else {
            let temp = (two + tempSum) % 10;
            if (temp === 0) temp = 10;
            twoSum += temp;
            two = temp;
        }
        isPlayerOne = !isPlayerOne;
    }

    const result = i * Math.min(oneSum, twoSum);

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
