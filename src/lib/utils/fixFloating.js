import { fillZero } from './fillZero';

/**
 * Fix Floating Point Number Precision
 * @param {Number} num
 * @param {Number} precision
 * @param {Boolean} addZero
 * @returns {String}
 */
export function fixFloating(num, precision = 2, addZero = false) {
    let str = num.toString();

    let parts = str.split('.');

    let decimals = parts[1];

    if (!decimals) {
        decimals = '';
    }

    decimals = `${decimals.substr(0, precision + 1)}`;

    if (decimals.length > precision && parseInt(parts[1][precision]) > 5) {
        str = (parseFloat(`${parts[0]}.${decimals}`) + 1 / (10 ** precision)).toString();

        parts = str.split('.');

        decimals = parts[1];

        if (!decimals) {
            decimals = '';
        }
    }

    decimals = decimals.substr(0, precision);

    if (addZero) {
        decimals = fillZero(decimals, 2, 'after');
    }

    return `${parts[0]}${(decimals !== '' && (parseInt(decimals) || addZero)) ? ('.' + decimals) : ''}`;
}
