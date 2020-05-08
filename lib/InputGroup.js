function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
export default class InputGroup extends PureComponent {
  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement("div", _extends({}, props, {
      className: `InputGroup ${className}`
    }), children);
  }

}

_defineProperty(InputGroup, "propTypes", {
  className: PropTypes.string,
  children: PropTypes.any
});

_defineProperty(InputGroup, "defaultProps", {
  className: ''
});