/**
 * if num length less than count, fill with zero
 * @param  {Number} num
 * @param  {Number} count
 * @param  {String} where
 * @returns {String}
 */
export function fillZero(num, count = 2, where) {
    const stringifiedNum = num.toString();
    const diff = count - stringifiedNum.length;

    if (diff > 0) {
        if (where === 'after') {
            return `${stringifiedNum}${'0'.repeat(diff)}`;
        } else {
            return `${'0'.repeat(diff)}${stringifiedNum}`;
        }
    }

    return stringifiedNum;
}
