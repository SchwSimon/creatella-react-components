function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { dismissAlert } from './ReduxReducers/alerts';
import AlertsCard from './Alerts/components/Card/AlertsCard';
import { ALERTS_POSITION_ARRAY, ALERT_TYPES_ARRAY } from './Alerts/config';
export { ALERTS_POSITION } from './Alerts/config';

class Alerts extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderAlert", ({
      id,
      ...props
    }) => {
      const {
        dismissAlert,
        position,
        renderTimeDisplay,
        isAutoDismiss,
        animationDuration,
        dismissDuration
      } = this.props;
      return /*#__PURE__*/React.createElement(AlertsCard, _extends({
        isAutoDismiss: isAutoDismiss,
        animationDuration: animationDuration,
        dismissDuration: dismissDuration
      }, props, {
        key: id,
        id: id,
        position: position,
        onDismiss: dismissAlert,
        renderTimeDisplay: renderTimeDisplay
      }));
    });
  }

  render() {
    const {
      alerts,
      position
    } = this.props;
    return createPortal( /*#__PURE__*/React.createElement("div", {
      className: `Alerts Alerts--${position}`
    }, alerts.map(this.renderAlert)), document.body);
  }

}

_defineProperty(Alerts, "propTypes", {
  position: PropTypes.oneOf(ALERTS_POSITION_ARRAY).isRequired,
  dismissAlert: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(ALERT_TYPES_ARRAY),
    position: PropTypes.oneOf(ALERTS_POSITION_ARRAY),
    message: PropTypes.any.isRequired
  }).isRequired).isRequired,
  isAutoDismiss: PropTypes.bool,
  animationDuration: PropTypes.number,
  dismissDuration: PropTypes.number,
  renderTimeDisplay: PropTypes.func
});

_defineProperty(Alerts, "defaultProps", {
  isAutoDismiss: true,
  animationDuration: 500,
  dismissDuration: 4000
});

function mapStateToProps({
  alerts
}) {
  return { ...alerts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dismissAlert: id => {
      dispatch(dismissAlert(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
