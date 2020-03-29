function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class PasswordStrengthMeter extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "loadModule", async () => {
      const zxcvbn = await import('zxcvbn');
      this.zxcvbn = zxcvbn.default;
      this.setPasswordScore();
    });

    _defineProperty(this, "setPasswordScore", () => {
      const {
        password
      } = this.props;
      this.setState({
        score: this.zxcvbn(password).score
      }, this.onUpdatedScore);
    });

    _defineProperty(this, "onUpdatedScore", () => {
      const {
        onChangeScore
      } = this.props;
      const {
        score
      } = this.state;

      if (onChangeScore) {
        onChangeScore(score);
      }
    });

    const {
      zxcvbn: _zxcvbn
    } = props;
    this.zxcvbn = _zxcvbn;
    this.state = {
      score: 0
    };
  }

  componentDidMount() {
    if (!this.zxcvbn) {
      this.loadModule();
    } else {
      this.setPasswordScore();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      password
    } = this.props;
    const {
      score
    } = this.state;

    if (this.zxcvbn && (password !== nextProps.password || score !== nextState.score)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const {
      password
    } = this.props;

    if (password !== prevProps.password) {
      this.setPasswordScore();
    }
  } // asynchronously load "zxcvbn" because it's a huge package


  render() {
    const {
      className
    } = this.props;
    const {
      score
    } = this.state;
    return React.createElement("div", {
      className: `PasswordStrengthMeter ${className}`
    }, React.createElement("div", {
      className: `PasswordStrengthMeter-bar PasswordStrengthMeter-bar--${score}`
    }));
  }

}

_defineProperty(PasswordStrengthMeter, "propTypes", {
  password: PropTypes.string.isRequired,
  zxcvbn: PropTypes.func,
  onChangeScore: PropTypes.func,
  className: PropTypes.string
});

_defineProperty(PasswordStrengthMeter, "defaultProps", {
  className: ''
});