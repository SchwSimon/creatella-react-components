function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class ItemPickerItem extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", () => {
      const {
        onSelect,
        item
      } = this.props;
      onSelect(item);
    });
  }

  render() {
    const {
      content,
      isActive
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: `ItemPickerItem ${isActive ? 'ItemPickerItem--active' : ''}`,
      onClick: this.onClick
    }, content);
  }

}

_defineProperty(ItemPickerItem, "propTypes", {
  onSelect: PropTypes.func.isRequired,
  content: PropTypes.any.isRequired,
  item: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
});