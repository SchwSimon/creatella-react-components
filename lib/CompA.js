function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/styles.scss';
export default class CompA extends Component {
  render() {
    return React.createElement("div", {
      className: "test"
    }, "AAAAAAA");
  }

}

_defineProperty(CompA, "propTypes", {
  text: PropTypes.string
});