import PropTypes from 'prop-types';
export const ItemPickerGlobalPropTypes = {
  isProcessing: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeSearch: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  maxSelections: PropTypes.number,
  minSelections: PropTypes.number,
  items: PropTypes.array.isRequired,
  itemsNameKey: PropTypes.string,
  itemsSearchConfig: PropTypes.object,
  renderItemContent: PropTypes.func
};
export const ItemPickerGlobalDefaultProps = {
  isProcessing: false,
  className: '',
  itemsNameKey: 'name',
  itemsSearchConfig: null,
  maxSelections: null,
  minSelections: 0,
  renderItemContent: null,
  onChangeSearch: null
};