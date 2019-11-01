/**
 * ellipsifies a string when exceeding the given max length
 * @param {String} string
 * @param {Number} maxLength
 * @param {String} appendix
 * @returns {String}
 */
export function ellipsisString(string, maxLength, appendix) {
  if (!string || typeof string !== 'string') {
    return '';
  }

  if (string.length > maxLength) {
    return `${string.substr(0, maxLength).trim()}${appendix}`;
  }

  return string;
}