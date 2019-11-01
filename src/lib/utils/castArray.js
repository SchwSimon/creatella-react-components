
/**
 * Cast any value to array
 * @param {*} value
 * @returns {Array}
 */
export function castArray(value) {
    if (!value) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}
