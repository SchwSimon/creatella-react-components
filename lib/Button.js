function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ActivityIndicator from './ActivityIndicator';
export default class Button extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClick", e => {
      const {
        onClick,
        isDisabled,
        isProcessing,
        debounceTime
      } = this.props;

      if (onClick && !isDisabled && !isProcessing && !this.IS_DEBOUNCE) {
        if (debounceTime) {
          this.IS_DEBOUNCE = true;
        }

        onClick(e);

        if (debounceTime) {
          this.DEBOUNCE_TIMEOUT = setTimeout(this.debounce, debounceTime);
        }
      }
    });

    _defineProperty(this, "debounce", () => {
      this.IS_DEBOUNCE = false;
    });

    this.IS_DEBOUNCE = false;
    this.DEBOUNCE_TIMEOUT = null;
  }

  componentWillUnmount() {
    clearTimeout(this.DEBOUNCE_TIMEOUT);
  }

  render() {
    const {
      className,
      classNameDisabled,
      classNameProcessing,
      classNameLink,
      classNameActivityIndicator,
      onClick,
      label,
      route,
      routeProps,
      isDisabled,
      isProcessing,
      children,
      sizeActivityIndicator,
      debounceTime,
      ...props
    } = this.props;
    return React.createElement("span", _extends({}, props, {
      className: `Button ${isDisabled ? `Button--disabled ${classNameDisabled}` : ''} ${isProcessing ? `Button--processing ${classNameProcessing}` : ''} ${className}`,
      onClick: this.onClick
    }), isProcessing ? React.createElement(ActivityIndicator, {
      classNameLoader: classNameActivityIndicator,
      size: sizeActivityIndicator
    }) : route ? React.createElement(Link, {
      className: `Button__link ${classNameLink}`,
      to: {
        pathname: route,
        state: routeProps
      }
    }, children || label) : children || label);
  }

}

_defineProperty(Button, "propTypes", {
  className: PropTypes.string,
  classNameLink: PropTypes.string,
  classNameDisabled: PropTypes.string,
  classNameProcessing: PropTypes.string,
  classNameActivityIndicator: PropTypes.string,
  label: PropTypes.string,
  route: PropTypes.string,
  routeProps: PropTypes.object,
  isDisabled: PropTypes.bool,
  isProcessing: PropTypes.bool,
  debounceTime: PropTypes.number,
  sizeActivityIndicator: PropTypes.number,
  onClick: PropTypes.func,
  children: PropTypes.any
});

_defineProperty(Button, "defaultProps", {
  className: '',
  classNameDisabled: '',
  classNameProcessing: '',
  classNameActivityIndicator: '',
  classNameLink: '',
  route: null,
  routeProps: null,
  label: '',
  isDisabled: false,
  isProcessing: false,
  debounceTime: 500,
  sizeActivityIndicator: 20
});