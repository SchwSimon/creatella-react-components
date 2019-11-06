function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withAsyncCaller } from './withAsyncCaller';
import ModalForgotPassword from '../Modals/ModalForgotPassword';
export function withForgotPassword(Component, configProps) {
  const STORAGEKEY_LOGIN_EMAIL = 'sk-wfp-email';
  const {
    requestTitle,
    requestSuccessText,
    resetTitle,
    resetSuccessText,
    onApiRequestError,
    onApiResetError,
    validatorEmail,
    validatorPassword,
    searchQueryKey: _searchQueryKey,
    apiRequest: _apiRequest,
    apiReset: _apiReset
  } = configProps;

  const _requestTitle = requestTitle || '';

  const _requestSuccessText = requestSuccessText || '';

  const _resetTitle = resetTitle || '';

  const _resetSuccessText = resetSuccessText || '';

  const _onApiRequestError = onApiRequestError || (() => '');

  const _onApiResetError = onApiResetError || (() => '');

  const _validatorEmail = validatorEmail || (() => true);

  const _validatorPassword = validatorPassword || (() => true);

  class WithForgotPassword extends PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "toggleModal", () => {
        const {
          isVisible,
          email
        } = this.state;
        sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);
        this.setState({
          isVisible: !isVisible
        });
      });

      _defineProperty(this, "onChangeEmail", e => {
        const email = e.target.value.trim();
        this.setState({
          email,
          isValidEmail: _validatorEmail(email)
        });
      });

      _defineProperty(this, "onChangePassword", e => {
        const password = e.target.value;
        this.setState({
          password,
          isValidPassword: _validatorPassword(password)
        });
      });

      _defineProperty(this, "submitEmail", () => {
        const {
          email
        } = this.state;
        sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);
        this.requestApi({
          api: _apiRequest,
          apiArgs: [email],
          onApiError: _onApiRequestError
        });
      });

      _defineProperty(this, "submitPassword", () => {
        const {
          password,
          resetCode
        } = this.state;
        this.requestApi({
          api: _apiReset,
          apiArgs: [resetCode, password],
          onApiError: _onApiResetError
        });
      });

      _defineProperty(this, "requestApi", async ({
        api,
        apiArgs,
        onApiError
      }) => {
        const {
          asyncCaller,
          setOwnProps
        } = this.props;
        setOwnProps({
          isProcessing: true,
          errorMessage: ''
        });

        try {
          await asyncCaller(api, ...apiArgs); // On success: remove the search queries from the url

          window.history.replaceState({}, document.title, window.location.pathname);
          setOwnProps({
            isProcessing: false,
            isSuccess: true
          });
        } catch (err) {
          setOwnProps({
            isProcessing: false,
            errorMessage: onApiError(err)
          });
        }
      });

      const {
        search
      } = window.location;

      const _email = sessionStorage.getItem(STORAGEKEY_LOGIN_EMAIL) || '';

      let _resetCode = '';

      if (search) {
        const findQuery = query => {
          const data = query.split('=');

          if (data.length === 2 && data[0] === _searchQueryKey && data[1]) {
            _resetCode = data[1];
            return true;
          }

          return false;
        };

        search.slice(1) // remove the "?"
        .split('&') // split all queries
        .find(findQuery); // find the code reset query
      }

      this.state = {
        isVisible: !!_resetCode,
        isValidEmail: _validatorEmail(_email),
        isValidPassword: false,
        email: _email,
        password: '',
        resetCode: _resetCode
      };
    }

    render() {
      const {
        isProcessing,
        isSuccess,
        errorMessage
      } = this.props;
      const {
        isVisible,
        isValidEmail,
        isValidPassword,
        email,
        password,
        resetCode
      } = this.state;
      return React.createElement(React.Fragment, null, React.createElement(Component, _extends({}, this.props, {
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        email: email,
        password: password,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        toggleForgotPasswordModal: this.toggleModal
      })), React.createElement(ModalForgotPassword, {
        isProcessing: isProcessing,
        isVisible: isVisible,
        isSuccess: isSuccess,
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        isResetCode: !!resetCode,
        requestTitle: _requestTitle,
        requestSuccessText: _requestSuccessText,
        resetTitle: _resetTitle,
        resetSuccessText: _resetSuccessText,
        email: email,
        password: password,
        onClose: this.toggleModal,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        onSubmitEmail: this.submitEmail,
        onSubmitPassword: this.submitPassword,
        errorMessage: errorMessage
      }));
    }

  }

  _defineProperty(WithForgotPassword, "propTypes", {
    asyncCaller: PropTypes.func.isRequired,
    setOwnProps: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool,
    isSuccess: PropTypes.bool,
    errorMessage: PropTypes.string
  });

  _defineProperty(WithForgotPassword, "defaultProps", {
    isProcessing: false,
    isSuccess: false,
    errorMessage: ''
  });

  return withAsyncCaller(WithForgotPassword);
}