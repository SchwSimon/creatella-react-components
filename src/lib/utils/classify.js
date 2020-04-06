/* eslint-disable no-control-regex */

/**
 * returns a concatenated class string each with the given subClass
 * Ex: classify('classA classB', '__sub') = 'classA__sub classB__sub'
 * @param {String} mainClass
 * @param {String} subClass
 * @returns {String}
 */
export function classify(mainClass, subClass) {
    mainClass = mainClass
        // replace all unicode lines break characters with a space
        .replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ')
        // replace all multiple spaces with a single space
        .replace(/ +(?= )/g, '')
        .trim()
        .split(' ');

    return `${mainClass.join(`${subClass} `)}${subClass}`;
}
