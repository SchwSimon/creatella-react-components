function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './RadioBox/RadioBox.scss';
export default class RadioBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", () => {
      const {
        onChange,
        id
      } = this.props;
      onChange(id);
    });
  }

  render() {
    const {
      className,
      onChange,
      id,
      checkedId,
      label,
      children
    } = this.props;
    const isChecked = id === checkedId;
    return React.createElement("div", {
      className: `RadioBox ${className}`,
      onClick: onChange && this.onChange
    }, React.createElement("div", {
      className: `RadioBox__box ${isChecked ? 'RadioBox__box--checked' : ''}`
    }), children || !!label && React.createElement("div", {
      className: "RadioBox__label"
    }, label));
  }

}

_defineProperty(RadioBox, "propTypes", {
  checkedId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.any
});

_defineProperty(RadioBox, "defaultProps", {
  className: '',
  label: ''
});