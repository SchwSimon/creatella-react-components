function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
/**
 * throttle update handler
 * @param {Component} Component
 * @param {Number} defaultThrottle
 * @returns {Component}
 */

export function withThrottledChange(Component, defaultThrottle = 150) {
  var _temp;

  return _temp = class WithThrottledChange extends PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "onChange", (value, callback, throttle = defaultThrottle) => {
        clearTimeout(this.TIMEOUT);
        this.VALUE = value;
        this.CALLBACK = callback;
        this.TIMEOUT = setTimeout(this.change, throttle);
      });

      _defineProperty(this, "change", () => {
        this.CALLBACK(this.VALUE);
      });

      this.VALUE = null;
      this.CALLBACK = null;
      this.TIMEOUT = null;
    }

    componentWillUnmount() {
      clearTimeout(this.TIMEOUT);
    }

    render() {
      return /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
        onChangeThrottled: this.onChange
      }));
    }

  }, _temp;
}