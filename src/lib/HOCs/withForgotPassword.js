import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withAsyncCaller } from './withAsyncCaller';
import ModalForgotPassword from '../Modals/ForgotPassword/ModalForgotPassword';

export function withForgotPassword(Component, configProps) {
    const STORAGEKEY_LOGIN_EMAIL = 'sk-wfp-email';

    const {
        validatorEmail, validatorPassword,
        useZxcvbn, zxcvbnMinScore,
        searchQueryKey: _searchQueryKey,
        apiRequest: _apiRequest, apiReset: _apiReset
    } = configProps;
    let { textConfig: _textConfig } = configProps;

    const _validatorEmail = validatorEmail || (() => true);
    const _validatorPassword = validatorPassword || (() => true);

    const _useZxcvbn = !!useZxcvbn;
    const _zxcvbnMinScore = zxcvbnMinScore || 0;

    class WithForgotPassword extends PureComponent {
        static propTypes = {
            asyncCaller: PropTypes.func.isRequired,
            setOwnProps: PropTypes.func.isRequired,
            isProcessing: PropTypes.bool,
            isRenderStrengthMeter: PropTypes.bool,
            isSuccess: PropTypes.bool
        }

        static defaultProps = {
            isProcessing: _useZxcvbn,
            isRenderStrengthMeter: false,
            isSuccess: false
        }

        constructor(props) {
            super(props);

            const { search } = window.location;
            const email = sessionStorage.getItem(STORAGEKEY_LOGIN_EMAIL) || '';

            let resetCode = '';

            if (search) {
                const findQuery = (query) => {
                    const data = query.split('=');

                    if (data.length === 2 && data[0] === _searchQueryKey && data[1]) {
                        resetCode = data[1];

                        return true;
                    }

                    return false;
                };

                search.slice(1) // remove the "?"
                    .split('&') // split all queries
                    .find(findQuery); // find the code reset query
            }

            this.state = {
                isVisible: !!resetCode,
                isValidEmail: _validatorEmail(email),
                isValidPassword: false,
                email,
                password: '',
                resetCode
            };
        }

        componentDidMount() {
            this.setZxcvbn();
        }

        // to be compatible with i18n
        setTextConfig = (textConfig) => {
            _textConfig = textConfig;

            this.forceUpdate();
        }

        setZxcvbn = async () => {
            const { setOwnProps } = this.props;

            if (_useZxcvbn) {
                const zxcvbn = await import('zxcvbn');

                this.zxcvbn = zxcvbn.default;

                setOwnProps({
                    isProcessing: false,
                    isRenderStrengthMeter: true
                });
            }
        }

        toggleModal = () => {
            const { isVisible, email } = this.state;

            sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);

            this.setState({ isVisible: !isVisible });
        }

        onChangeEmail = (e) => {
            const email = e.target.value.trim();

            this.setState({
                email,
                isValidEmail: _validatorEmail(email)
            });
        }

        onChangePassword = (e) => {
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
        }

        submitEmail = () => {
            const { email } = this.state;

            sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);

            this.requestApi({
                api: _apiRequest,
                apiArgs: [email]
            });
        }

        submitPassword = () => {
            const { password, resetCode } = this.state;

            this.requestApi({
                api: _apiReset,
                apiArgs: [resetCode, password]
            });
        }

        requestApi = async ({ api, apiArgs }) => {
            const { asyncCaller, setOwnProps } = this.props;

            setOwnProps({ isProcessing: true });

            try {
                await asyncCaller(api, ...apiArgs);

                // On success: remove the search queries from the url
                window.history.replaceState({}, document.title, window.location.pathname);

                setOwnProps({
                    isProcessing: false,
                    isSuccess: true
                });
            } catch (err) {
                if (err) {
                    setOwnProps({ isProcessing: false });
                }
            }
        }

        onBackToRequestUI = () => {
            this.setState({ resetCode: '' });
        }

        render() {
            const { isProcessing, isRenderStrengthMeter, isSuccess } = this.props;
            const {
                isVisible, isValidEmail, isValidPassword,
                email, password, resetCode
            } = this.state;

            return (
                <>
                    <Component
                        {...this.props}
                        isValidEmail={isValidEmail}
                        isValidPassword={isValidPassword}
                        email={email}
                        password={password}
                        setTextConfig={this.setTextConfig}
                        onChangeEmail={this.onChangeEmail}
                        onChangePassword={this.onChangePassword}
                        toggleForgotPasswordModal={this.toggleModal} />

                    <ModalForgotPassword
                        isProcessing={isProcessing}
                        isVisible={isVisible}
                        isSuccess={isSuccess}
                        isValidEmail={isValidEmail}
                        isValidPassword={isValidPassword}
                        isResetCode={!!resetCode}
                        isRenderStrengthMeter={isRenderStrengthMeter}
                        zxcvbn={this.zxcvbn}
                        email={email}
                        password={password}
                        onClose={this.toggleModal}
                        onBackToRequestUI={this.onBackToRequestUI}
                        onChangeEmail={this.onChangeEmail}
                        onChangePassword={this.onChangePassword}
                        onSubmitEmail={this.submitEmail}
                        onSubmitPassword={this.submitPassword}
                        {..._textConfig} />
                </>
            );
        }
    }

    return withAsyncCaller(WithForgotPassword);
}
