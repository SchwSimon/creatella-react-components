function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class Input extends PureComponent {
  render() {
    const {
      className,
      isReadOnly,
      isDisabled,
      isValid,
      isInvalid,
      isTextArea,
      ...props
    } = this.props;

    if (isTextArea) {
      return React.createElement("textarea", _extends({
        readOnly: isReadOnly,
        disabled: isDisabled
      }, props, {
        className: `Input Input--textarea ${isInvalid ? 'Input--isInvalid' : isValid ? 'Input--isValid' : ''} ${className}`
      }));
    }

    return React.createElement("input", _extends({
      readOnly: isReadOnly,
      disabled: isDisabled
    }, props, {
      className: `Input ${isInvalid ? 'Input--isInvalid' : isValid ? 'Input--isValid' : ''} ${className}`
    }));
  }

}

_defineProperty(Input, "propTypes", {
  className: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isTextArea: PropTypes.bool
});

_defineProperty(Input, "defaultProps", {
  className: '',
  isReadOnly: false,
  isDisabled: false,
  isValid: false,
  isInvalid: false,
  isTextArea: false
});