function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './CheckBox/CheckBox.scss';
export default class CheckBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", () => {
      const {
        onChange,
        isChecked,
        value
      } = this.props;
      onChange(isChecked, value);
    });
  }

  render() {
    const {
      className,
      onChange,
      isChecked,
      label,
      children
    } = this.props;
    return React.createElement("div", {
      className: `CheckBox ${className}`,
      onClick: onChange && this.onChange
    }, React.createElement("div", {
      className: `CheckBox__box ${isChecked ? 'CheckBox__box--checked' : ''}`
    }, React.createElement(FontAwesomeIcon, {
      className: `CheckBox__box-check ${isChecked ? 'CheckBox__box-check--checked' : ''}`,
      icon: faCheck
    })), children || !!label && React.createElement("div", {
      className: "CheckBox__label"
    }, label));
  }

}

_defineProperty(CheckBox, "propTypes", {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any,
  value: PropTypes.any
});

_defineProperty(CheckBox, "defaultProps", {
  className: '',
  label: ''
});