function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
/**
 * add windows resize handler to a component
 * @param {Component} Component
 * @param {Number} delay
 * @returns {Component}
 */

export function withWindowResizeListener(Component, delay = 100) {
  return class WithWindowResizeListener extends PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "onWindowResize", () => {
        clearTimeout(this.TIMEOUT);
        this.TIMEOUT = setTimeout(this.onWindowResizeDone, delay);
      });

      _defineProperty(this, "onWindowResizeDone", () => {
        this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        });
      });

      this.TIMEOUT = null;
      this.state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
      clearTimeout(this.TIMEOUT);
    }

    render() {
      const {
        windowWidth,
        windowHeight
      } = this.state;
      return /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
        windowWidth: windowWidth,
        windowHeight: windowHeight
      }));
    }

  };
}