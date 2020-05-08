function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '../../../Button';
import { ALERT_TYPES } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faTimes, faExclamationCircle, faTimesCircle, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
export default class AlertsCard extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "requestAnimationFrame", () => {
      requestAnimationFrame(this.startDismiss);
    });

    _defineProperty(this, "startDismiss", () => {
      const {
        isAutoDismiss
      } = this.props;
      this.setState({
        dismissTimeoutStartDate: Date.now(),
        dismissTimeout: isAutoDismiss ? setTimeout(this.onDismiss, this.dismissCountdown) : null
      });
    });

    _defineProperty(this, "onMouseEnter", () => {
      const {
        dismissTimeoutStartDate,
        dismissTimeout
      } = this.state;
      clearTimeout(dismissTimeout);
      this.dismissCountdown = this.dismissCountdown - (Date.now() - dismissTimeoutStartDate);
      this.setState({
        dismissTimeout: null
      });
    });

    _defineProperty(this, "onMouseLeave", () => {
      this.setState({
        dismissTimeoutStartDate: new Date(),
        dismissTimeout: setTimeout(this.onDismiss, this.dismissCountdown)
      });
    });

    _defineProperty(this, "onPin", () => {
      const {
        dismissTimeout
      } = this.state;
      clearTimeout(dismissTimeout);
      this.setState({
        dismissTimeout: null,
        isPinned: true
      });
    });

    _defineProperty(this, "onUpdateTime", () => {
      const {
        renderTimeDisplay
      } = this.props;
      const {
        timestamp
      } = this.state;
      this.setState({
        timeDisplay: renderTimeDisplay ? renderTimeDisplay(timestamp) : formatDistanceStrict(timestamp, new Date(), {
          addSuffix: true
        })
      });
    });

    _defineProperty(this, "onDismiss", () => {
      const {
        animationDuration
      } = this.props;
      this.setState({
        dismissedTimeout: setTimeout(this.onDismissFinal, animationDuration)
      });
    });

    _defineProperty(this, "onDismissFinal", () => {
      const {
        id,
        onDismiss
      } = this.props;
      onDismiss(id);
    });

    const {
      type,
      dismissDuration,
      renderTimeDisplay: _renderTimeDisplay
    } = props;
    let icon;

    switch (type) {
      case ALERT_TYPES.INFO:
        icon = faExclamationCircle;
        break;

      case ALERT_TYPES.SUCCESS:
        icon = faCheckCircle;
        break;

      case ALERT_TYPES.WARNING:
        icon = faExclamationTriangle;
        break;

      case ALERT_TYPES.ERROR:
        icon = faTimesCircle;
        break;

      default:
        break;
    }

    this.dismissCountdown = dismissDuration;
    this.updateInterval = null;
    this.state = {
      dismissTimeoutStartDate: null,
      dismissTimeout: null,
      dismissedTimeout: null,
      timestamp: new Date(),
      timeDisplay: _renderTimeDisplay ? _renderTimeDisplay() : 'just now',
      icon
    };
  }

  componentDidMount() {
    this.startTimeout = setTimeout(this.requestAnimationFrame, 50);
    this.updateInterval = setInterval(this.onUpdateTime, 60000);
  }

  componentWillUnmount() {
    const {
      startTimeout,
      updateInterval
    } = this;
    const {
      dismissTimeout,
      dismissedTimeout
    } = this.state;
    clearTimeout(startTimeout);
    clearTimeout(dismissTimeout);
    clearTimeout(dismissedTimeout);
    clearInterval(updateInterval);
  }

  render() {
    const {
      position,
      type,
      message,
      isAutoDismiss,
      dismissDuration,
      animationDuration
    } = this.props;
    const {
      icon,
      dismissTimeout,
      dismissTimeoutStartDate,
      isPinned,
      timeDisplay,
      dismissedTimeout
    } = this.state;
    const isMouseHandlers = isAutoDismiss && !isPinned;
    return /*#__PURE__*/React.createElement("div", {
      className: `AlertsCard AlertsCard--${type} AlertsCard--${position} ${dismissTimeoutStartDate && !dismissedTimeout ? `AlertsCard--${position}-init` : ''}`,
      onMouseEnter: isMouseHandlers ? this.onMouseEnter : null,
      onMouseLeave: isMouseHandlers ? this.onMouseLeave : null,
      style: {
        transitionDuration: `${animationDuration}ms`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "AlertsCard__header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "AlertsCard__header-left"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "AlertsCard__header-right"
    }, /*#__PURE__*/React.createElement("time", {
      className: "AlertsCard__header-right-time"
    }, timeDisplay), isMouseHandlers && /*#__PURE__*/React.createElement(Button, {
      className: "AlertsCard__header-right-button",
      onClick: this.onPin
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faThumbtack
    })), /*#__PURE__*/React.createElement(Button, {
      className: "AlertsCard__header-right-button",
      onClick: this.onDismiss
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faTimes
    })))), /*#__PURE__*/React.createElement("div", {
      className: "AlertsCard__body"
    }, isAutoDismiss && /*#__PURE__*/React.createElement("div", {
      className: "AlertsCard__body-countdown"
    }, /*#__PURE__*/React.createElement("div", {
      className: `AlertsCard__body-countdown-bar AlertsCard__body-countdown-bar--${type} ${isPinned ? 'AlertsCard__body-countdown-bar--pinned' : ''}`,
      style: {
        animationDuration: `${dismissDuration}ms`,
        animationPlayState: !dismissTimeout ? 'paused' : 'running'
      }
    })), message));
  }

}

_defineProperty(AlertsCard, "propTypes", {
  id: PropTypes.number.isRequired,
  message: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  isAutoDismiss: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  dismissDuration: PropTypes.number.isRequired,
  renderTimeDisplay: PropTypes.func
});