function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './ActivityIndicator/ActivityIndicator.scss';
export default class ActivityIndicator extends PureComponent {
  render() {
    const {
      className,
      classNameInfo,
      size,
      info
    } = this.props;
    return React.createElement("span", {
      className: `ActivityIndicator ${className}`
    }, React.createElement("svg", {
      className: "ActivityIndicator__spinner",
      "aria-label": info || 'loading',
      width: `${size}px`,
      height: `${size}px`,
      viewBox: "0 0 66 66",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("circle", {
      className: "ActivityIndicator__spinner-path",
      fill: "none",
      strokeWidth: "6",
      strokeLinecap: "round",
      cx: "33",
      cy: "33",
      r: "30"
    })), info && React.createElement("div", {
      className: `ActivityIndicator__info ${classNameInfo}`
    }, info));
  }

}

_defineProperty(ActivityIndicator, "propTypes", {
  size: PropTypes.number,
  className: PropTypes.string,
  classNameInfo: PropTypes.string,
  info: PropTypes.string
});

_defineProperty(ActivityIndicator, "defaultProps", {
  size: 24,
  className: '',
  classNameInfo: '',
  info: ''
});