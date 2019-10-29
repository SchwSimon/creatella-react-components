function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import './Avatar/Avatar.scss';
export default class Avatar extends PureComponent {
  render() {
    const {
      src,
      icon,
      className
    } = this.props;
    return React.createElement("div", {
      className: `Avatar ${className}`,
      style: {
        backgroundImage: `url(${src})`
      }
    }, !src && React.createElement(FontAwesomeIcon, {
      icon: icon
    }));
  }

}

_defineProperty(Avatar, "propTypes", {
  src: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string
});

_defineProperty(Avatar, "defaultProps", {
  icon: faUserTie,
  className: ''
});