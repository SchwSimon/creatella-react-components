function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class ItemPickerViewItem extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", e => {
      const {
        isSingleSelection,
        onClick,
        onRemove,
        item
      } = this.props;
      e.stopPropagation();

      if (onClick) {
        onClick(item);
      } else if (!isSingleSelection) {
        onRemove(item);
      }
    });
  }

  render() {
    const {
      className,
      style,
      isSingleSelection,
      children
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: `
                    ItemPickerViewItem
                    ${className}
                    ${isSingleSelection ? 'ItemPickerViewItem--isSingleSelection' : ''}
                `,
      style: style,
      onClick: this.onClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "ItemPickerViewItem__content"
    }, children));
  }

}

_defineProperty(ItemPickerViewItem, "propTypes", {
  className: PropTypes.string,
  style: PropTypes.object,
  isSingleSelection: PropTypes.bool,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  item: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired
});

_defineProperty(ItemPickerViewItem, "defaultProps", {
  className: '',
  style: {}
});