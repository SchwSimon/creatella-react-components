import { APP_CURRENCY_SYMBOL } from 'config/constants';
import { fixFloating } from './fixFloating';

/**
 * Proxy all currency values (attach currency symbol, etc)
 * @param {Number} price
 * @param {Boolean} signed
 * @param {String} symbol
 * @returns {String}
 */
export function currencify(price, signed, symbol = APP_CURRENCY_SYMBOL) {
    if (price === 0) {
        return `${symbol}${fixFloating(0, 2, true)}`;
    }

    if (price > 0) {
        return !signed ? (
            `${symbol}${fixFloating(price, 2, true)}`
        ) : (
            `+${symbol}${fixFloating(price, 2, true)}`
        );
    }

    if (price < 0) {
        return `-${symbol}${fixFloating(Math.abs(price), 2, true)}`;
    }
}
