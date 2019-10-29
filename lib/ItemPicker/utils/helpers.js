// export function getItemDisplayValue(items, value, displayValue = '') {
//     if (!value) {
//         return displayValue;
//     }
//
//     if (typeof value === 'number') {
//         const filterItems = (item) => item.id === value;
//         const item = items.find(filterItems);
//
//         return item ? item.name : '';
//     }
//
//     const filterItems = (item) => value.indexOf(item.id) > -1;
//     const mapItem = (item) => item.name;
//     const itemsFiltered = items.filter(filterItems);
//
//     return !itemsFiltered.length
//         ? displayValue
//         : itemsFiltered.length > 3
//             ? `${itemsFiltered.length} selections`
//             : itemsFiltered.map(mapItem).join(', ');
// }
export function getStateValueByPropsValue(value) {
  if (!value) {
    return [];
  }

  if (typeof value === 'number') {
    return [value];
  }

  return value;
}