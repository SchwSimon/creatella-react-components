function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ActivityIndicator from './ActivityIndicator';
import './Button/Button.scss';
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
      route,
      routeProps,
      label,
      isDisabled,
      isProcessing,
      children,
      sizeActivityIndicator
    } = this.props;
    return React.createElement("span", {
      className: `Button ${isDisabled ? `Button--disabled ${classNameDisabled}` : ''} ${isProcessing ? `Button--processing ${classNameProcessing}` : ''} ${className}`,
      onClick: this.onClick
    }, isProcessing ? React.createElement(ActivityIndicator, {
      classNameLoader: classNameActivityIndicator,
      size: sizeActivityIndicator
    }) : route ? React.createElement(Link, {
      className: `Button__link ${classNameLink}`,
      to: {
        pathname: route,
        state: routeProps
      }
    }, children ? children : label) : children || label);
  }

}

_defineProperty(Button, "propTypes", {
  className: PropTypes.string,
  classNameLink: PropTypes.string,
  classNameDisabled: PropTypes.string,
  classNameProcessing: PropTypes.string,
  route: PropTypes.string,
  routeProps: PropTypes.object,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isProcessing: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
  debounceTime: PropTypes.number,
  sizeActivityIndicator: PropTypes.number
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