function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withAsyncCaller } from './withAsyncCaller';
import ModalForgotPassword from '../Modals/ForgotPassword/ModalForgotPassword';
export function withForgotPassword(Component, configProps) {
  const STORAGEKEY_LOGIN_EMAIL = 'sk-wfp-email';
  const {
    validatorEmail,
    validatorPassword,
    useZxcvbn,
    zxcvbnMinScore,
    searchQueryKey: _searchQueryKey,
    apiRequest: _apiRequest,
    apiReset: _apiReset
  } = configProps;
  let {
    textConfig: _textConfig
  } = configProps;

  const _validatorEmail = validatorEmail || (() => true);

  const _validatorPassword = validatorPassword || (() => true);

  const _useZxcvbn = !!useZxcvbn;

  const _zxcvbnMinScore = zxcvbnMinScore || 0;

  class WithForgotPassword extends PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "setTextConfig", textConfig => {
        _textConfig = textConfig;
        this.forceUpdate();
      });

      _defineProperty(this, "setZxcvbn", async () => {
        const {
          setOwnProps
        } = this.props;

        if (_useZxcvbn) {
          const zxcvbn = await import('zxcvbn');
          this.zxcvbn = zxcvbn.default;
          setOwnProps({
            isProcessing: false,
            isRenderStrengthMeter: true
          });
        }
      });

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
        let isValidPassword;

        if (_useZxcvbn && _zxcvbnMinScore && this.zxcvbn) {
          const passwordScore = this.zxcvbn(password).score;
          isValidPassword = passwordScore >= _zxcvbnMinScore;
        } else {
          isValidPassword = _validatorPassword(password);
        }

        this.setState({
          password,
          isValidPassword
        });
      });

      _defineProperty(this, "submitEmail", () => {
        const {
          email
        } = this.state;
        sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);
        this.requestApi({
          api: _apiRequest,
          apiArgs: [email]
        });
      });

      _defineProperty(this, "submitPassword", () => {
        const {
          password,
          resetCode
        } = this.state;
        this.requestApi({
          api: _apiReset,
          apiArgs: [resetCode, password]
        });
      });

      _defineProperty(this, "requestApi", async ({
        api,
        apiArgs
      }) => {
        const {
          asyncCaller,
          setOwnProps
        } = this.props;
        setOwnProps({
          isProcessing: true
        });

        try {
          await asyncCaller(api, ...apiArgs); // On success: remove the search queries from the url

          window.history.replaceState({}, document.title, window.location.pathname);
          setOwnProps({
            isProcessing: false,
            isSuccess: true
          });
        } catch (err) {
          if (err) {
            setOwnProps({
              isProcessing: false
            });
          }
        }
      });

      _defineProperty(this, "onBackToRequestUI", () => {
        this.setState({
          resetCode: ''
        });
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

    componentDidMount() {
      this.setZxcvbn();
    } // to be compatible with i18n


    render() {
      const {
        isProcessing,
        isRenderStrengthMeter,
        isSuccess
      } = this.props;
      const {
        isVisible,
        isValidEmail,
        isValidPassword,
        email,
        password,
        resetCode
      } = this.state;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Component, _extends({}, this.props, {
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        email: email,
        password: password,
        setTextConfig: this.setTextConfig,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        toggleForgotPasswordModal: this.toggleModal
      })), /*#__PURE__*/React.createElement(ModalForgotPassword, _extends({
        isProcessing: isProcessing,
        isVisible: isVisible,
        isSuccess: isSuccess,
        isValidEmail: isValidEmail,
        isValidPassword: isValidPassword,
        isResetCode: !!resetCode,
        isRenderStrengthMeter: isRenderStrengthMeter,
        zxcvbn: this.zxcvbn,
        email: email,
        password: password,
        onClose: this.toggleModal,
        onBackToRequestUI: this.onBackToRequestUI,
        onChangeEmail: this.onChangeEmail,
        onChangePassword: this.onChangePassword,
        onSubmitEmail: this.submitEmail,
        onSubmitPassword: this.submitPassword
      }, _textConfig)));
    }

  }

  _defineProperty(WithForgotPassword, "propTypes", {
    asyncCaller: PropTypes.func.isRequired,
    setOwnProps: PropTypes.func.isRequired,
    isProcessing: PropTypes.bool,
    isSuccess: PropTypes.bool
  });

  _defineProperty(WithForgotPassword, "defaultProps", {
    isProcessing: _useZxcvbn,
    isRenderStrengthMeter: false,
    isSuccess: false
  });

  return withAsyncCaller(WithForgotPassword);
}