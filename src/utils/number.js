/**
 * 获取随机数
 * @param minNum 最小数
 * @param maxNum 最大数
 */
exports.randomNum = (minNum, maxNum) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
