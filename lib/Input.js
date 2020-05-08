function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class Input extends PureComponent {
  render() {
    const {
      className,
      classNameValid,
      classNameInvalid,
      isReadOnly,
      isDisabled,
      isValid,
      isInvalid,
      isTextArea,
      ...props
    } = this.props;
    let classNamesInvalid = '';
    let classNamesValid = '';

    if (isInvalid) {
      classNamesInvalid = `Input--isInvalid ${classNameInvalid}`;
    } else if (isValid) {
      classNamesValid = `Input--isValid ${classNameValid}`;
    }

    if (isTextArea) {
      return /*#__PURE__*/React.createElement("textarea", _extends({
        readOnly: isReadOnly,
        disabled: isDisabled
      }, props, {
        className: `Input Input--textarea ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`
      }));
    }

    return /*#__PURE__*/React.createElement("input", _extends({
      readOnly: isReadOnly,
      disabled: isDisabled
    }, props, {
      className: `Input ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`
    }));
  }

}

_defineProperty(Input, "propTypes", {
  className: PropTypes.string,
  classNameValid: PropTypes.string,
  classNameInvalid: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isTextArea: PropTypes.bool
});

_defineProperty(Input, "defaultProps", {
  className: '',
  classNameValid: '',
  classNameInvalid: '',
  isReadOnly: false,
  isDisabled: false,
  isValid: false,
  isInvalid: false,
  isTextArea: false
});