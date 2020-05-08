function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
export default class Avatar extends PureComponent {
  render() {
    const {
      src,
      icon,
      className,
      style,
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement("div", _extends({}, props, {
      className: `Avatar ${className}`,
      style: { ...style,
        backgroundImage: `url(${src})`
      }
    }), !src && /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: icon
    }));
  }

}

_defineProperty(Avatar, "propTypes", {
  src: PropTypes.string,
  icon: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string
});

_defineProperty(Avatar, "defaultProps", {
  icon: faUserTie,
  style: {},
  className: ''
});