const utils = require('../../utils');

((path, data = utils.readFile(path)) => {
    console.time();

    data = data.split(utils.LINE_BREAK).map(line => line.split(': '));

    var result = 0;

    function dfs(nums, index, sum, target) {
        if (index === nums.length) {
            return sum === target;
        }

        return (
            dfs(nums, index + 1, sum + nums[index], target) ||
            dfs(nums, index + 1, sum * nums[index], target) ||
            dfs(nums, index + 1, Number(sum + '' + nums[index]), target)
        );
    }

    for (var line of data) {
        var target = +line[0];
        var numbers = line[1].split(' ').map(v => +v);

        if (dfs(numbers, 1, numbers[0], target)) {
            result += target;
        }
    }

    console.timeEnd();
    console.log(result);
})(process.argv[1]);
