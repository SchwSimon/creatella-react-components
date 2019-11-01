
/**
 * Create a deep copy of an object
 * @param {Object} obj
 * @returns {Object}
 */
export function deepCopyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
