export function computeItemPickerChangeValue({
  item,
  value,
  minSelections,
  maxSelections
}) {
  const {
    id
  } = item;
  const isArray = typeof value !== 'number';

  if (maxSelections === 1 || !isArray) {
    if (minSelections === 1) {
      return isArray ? [id] : id;
    }

    if (isArray) {
      return value.indexOf(id) > -1 ? [] : [id];
    }

    return value === id ? 0 : id;
  }

  const filterId = _id => _id !== id;

  const nextValue = value.indexOf(id) > -1 ? value.filter(filterId) : value.concat(id); // DO NOTHING:
  // if selected less than the minimum
  // if a maximum is set
  // '- AND if selected more than the maximum
  // '- AND if the selected is more than the current
  //  '-> always let the user unselect from the max, even if there are more selected than the maximum

  if (nextValue.length < minSelections || maxSelections && nextValue.length > maxSelections && nextValue.length > value.length) {
    return false;
  }

  return nextValue;
}