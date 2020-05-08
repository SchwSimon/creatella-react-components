function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class ErrorBoundary extends Component {
  static getDerivedStateFromError() {
    // eslint-disable-line react/sort-comp
    return {
      isError: true
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      pathname
    } = this.props;
    const {
      isError
    } = this.state;

    if (pathname !== nextProps.pathname || isError !== nextState.isError) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const {
      pathname
    } = this.props;
    const {
      isError
    } = this.state;

    if (isError && pathname !== prevProps.pathname) {
      this.setState({
        isError: false
      });
    }
  }

  componentDidCatch(error, info) {
    const {
      onError
    } = this.props;
    onError && onError(error, info);
  }

  render() {
    const {
      fallbackMessage,
      fallbackScreen,
      children
    } = this.props;
    const {
      isError
    } = this.state;

    if (isError) {
      return fallbackScreen || /*#__PURE__*/React.createElement("div", {
        className: "ErrorBoundary"
      }, fallbackMessage);
    }

    return children;
  }

}

_defineProperty(ErrorBoundary, "propTypes", {
  pathname: PropTypes.string.isRequired,
  onError: PropTypes.func,
  fallbackMessage: PropTypes.string,
  fallbackScreen: PropTypes.any,
  children: PropTypes.any
});

_defineProperty(ErrorBoundary, "defaultProps", {
  fallbackMessage: 'Oops, an error occurred !'
});