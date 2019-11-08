function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modal';
import InputGroup from '../../InputGroup';
import Input from '../../Input';
import Button from '../../Button';
import PasswordStrengthMeter from '../../PasswordStrengthMeter';
export default class ModalForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onTogglePasswordVisibility", () => {
      const {
        isPasswordVisible
      } = this.state;
      this.setState({
        isPasswordVisible: !isPasswordVisible
      });
    });

    _defineProperty(this, "renderRequestUI", () => {
      const {
        isProcessing,
        isSuccess,
        isValidEmail,
        requestTitle,
        requestSuccessText,
        email,
        onChangeEmail,
        onSubmitEmail,
        errorMessage
      } = this.props;
      return React.createElement("div", {
        className: "ModalForgotPassword"
      }, React.createElement("div", {
        className: "ModalForgotPassword__title"
      }, requestTitle), React.createElement("div", {
        className: "ModalForgotPassword__content"
      }, !isSuccess && React.createElement("label", {
        className: "ModalForgotPassword__content-label",
        htlmfor: "ModalForgotPassword__content-inputGroup-input"
      }, "Enter your email"), React.createElement(InputGroup, {
        className: "ModalForgotPassword__content-inputGroup"
      }, React.createElement(Input, {
        id: "ModalForgotPassword__content-inputGroup-input",
        className: `ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`,
        isDisabled: isProcessing || isSuccess,
        isReadOnly: isSuccess,
        isValid: isValidEmail && !isSuccess,
        type: "email",
        autoComplete: "email",
        value: email,
        placeholder: "E-Mail",
        onChange: onChangeEmail
      })), React.createElement("div", {
        className: "ModalForgotPassword__content-error"
      }, errorMessage)), React.createElement("div", {
        className: "ModalForgotPassword__footer"
      }, isSuccess ? React.createElement("div", {
        className: "ModalForgotPassword__footer-success"
      }, requestSuccessText) : React.createElement(Button, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--confirm",
        label: "Confirm",
        isDisabled: !isValidEmail,
        isProcessing: isProcessing,
        onClick: onSubmitEmail
      })));
    });

    _defineProperty(this, "renderResetUI", () => {
      const {
        isProcessing,
        isRenderStrengthMeter,
        isSuccess,
        isValidPassword,
        resetTitle,
        resetSuccessText,
        onChangePassword,
        onSubmitPassword,
        onClose,
        onBackToRequestUI,
        email,
        password,
        errorMessage,
        zxcvbn
      } = this.props;
      const {
        isPasswordVisible
      } = this.state;
      return React.createElement("div", {
        className: "ModalForgotPassword"
      }, React.createElement("div", {
        className: "ModalForgotPassword__title"
      }, resetTitle), React.createElement("div", {
        className: "ModalForgotPassword__content"
      }, !isSuccess && React.createElement("label", {
        className: "ModalForgotPassword__content-label",
        htlmfor: "ModalForgotPassword__content-inputGroup-input"
      }, "Enter your new password"), React.createElement(Input, {
        className: "ModalForgotPassword__content-hiddenEmailInput",
        type: "email",
        value: email
      }), React.createElement(InputGroup, {
        className: "ModalForgotPassword__content-inputGroup"
      }, React.createElement(Input, {
        id: "ModalForgotPassword__content-inputGroup-input",
        className: `ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`,
        type: isPasswordVisible ? 'text' : 'password',
        isDisabled: isProcessing || isSuccess,
        isReadOnly: isSuccess,
        value: password,
        placeholder: "Password",
        onChange: onChangePassword
      }), React.createElement(Button, {
        className: "ModalForgotPassword__content-inputGroup-passwordToggle",
        onClick: this.onTogglePasswordVisibility
      }, React.createElement(FontAwesomeIcon, {
        icon: isPasswordVisible ? faEyeSlash : faEye
      }))), isRenderStrengthMeter && React.createElement(PasswordStrengthMeter, {
        className: "ModalForgotPassword__content-PasswordStrengthMeter",
        zxcvbn: zxcvbn,
        password: password
      }), React.createElement("div", {
        className: "ModalForgotPassword__content-error"
      }, errorMessage)), React.createElement("div", {
        className: "ModalForgotPassword__footer"
      }, isSuccess ? React.createElement("div", {
        className: "ModalForgotPassword__footer-success"
      }, resetSuccessText, React.createElement(Button, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--toLogin",
        label: "Back to Login",
        onClick: onClose
      })) : React.createElement(Button, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--confirm",
        label: "Confirm",
        isDisabled: !isValidPassword,
        isProcessing: isProcessing,
        onClick: onSubmitPassword
      }), React.createElement(Button, {
        className: "ModalForgotPassword__button ModalForgotPassword__button--backToRequestUI",
        label: "Click here to request a new password reset.",
        onClick: onBackToRequestUI
      })));
    });

    this.state = {
      isPasswordVisible: false
    };
  }

  render() {
    const {
      isProcessing,
      isVisible,
      isResetCode,
      onClose
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return React.createElement(Modal, {
      isVisible: isVisible,
      onClose: !isProcessing ? onClose : null
    }, isResetCode ? this.renderResetUI() : this.renderRequestUI());
  }

}

_defineProperty(ModalForgotPassword, "propTypes", {
  isProcessing: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isValidEmail: PropTypes.bool.isRequired,
  isValidPassword: PropTypes.bool.isRequired,
  isResetCode: PropTypes.bool.isRequired,
  isRenderStrengthMeter: PropTypes.bool.isRequired,
  zxcvbn: PropTypes.func,
  requestTitle: PropTypes.string.isRequired,
  requestSuccessText: PropTypes.string.isRequired,
  resetTitle: PropTypes.string.isRequired,
  resetSuccessText: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onBackToRequestUI: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
});