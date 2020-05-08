function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class ItemPickerViewItem extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onRemove", e => {
      const {
        onRemove,
        item
      } = this.props;
      e.stopPropagation();
      onRemove(item);
    });
  }

  render() {
    const {
      isSingleSelection,
      content
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: `ItemPickerViewItem ${isSingleSelection ? 'ItemPickerViewItem--isSingleSelection' : ''}`,
      onClick: !isSingleSelection ? this.onRemove : null
    }, /*#__PURE__*/React.createElement("span", {
      className: "ItemPickerViewItem__content"
    }, content));
  }

}

_defineProperty(ItemPickerViewItem, "propTypes", {
  isSingleSelection: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  content: PropTypes.any.isRequired
});