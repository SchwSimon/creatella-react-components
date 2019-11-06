import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withAsyncCaller } from './withAsyncCaller';
import ModalForgotPassword from '../Modals/ForgotPassword/ModalForgotPassword';

export function withForgotPassword(Component, configProps) {
    const STORAGEKEY_LOGIN_EMAIL = 'sk-wfp-email';

    const {
        requestTitle, requestSuccessText, resetTitle, resetSuccessText,
        onApiRequestError, onApiResetError,
        validatorEmail, validatorPassword,
        searchQueryKey: _searchQueryKey,
        apiRequest: _apiRequest, apiReset: _apiReset
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
        static propTypes = {
            asyncCaller: PropTypes.func.isRequired,
            setOwnProps: PropTypes.func.isRequired,
            isProcessing: PropTypes.bool,
            isSuccess: PropTypes.bool,
            errorMessage: PropTypes.string
        }

        static defaultProps = {
            isProcessing: false,
            isSuccess: false,
            errorMessage: ''
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

            this.setState({
                password,
                isValidPassword: _validatorPassword(password)
            });
        }

        submitEmail = () => {
            const { email } = this.state;

            sessionStorage.setItem(STORAGEKEY_LOGIN_EMAIL, email);

            this.requestApi({
                api: _apiRequest,
                apiArgs: [email],
                onApiError: _onApiRequestError
            });
        }

        submitPassword = () => {
            const { password, resetCode } = this.state;

            this.requestApi({
                api: _apiReset,
                apiArgs: [resetCode, password],
                onApiError: _onApiResetError
            });
        }

        requestApi = async ({ api, apiArgs, onApiError }) => {
            const { asyncCaller, setOwnProps } = this.props;

            setOwnProps({
                isProcessing: true,
                errorMessage: ''
            });

            try {
                await asyncCaller(api, ...apiArgs);

                // On success: remove the search queries from the url
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
        }

        render() {
            const { isProcessing, isSuccess, errorMessage } = this.props;
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
                        requestTitle={_requestTitle}
                        requestSuccessText={_requestSuccessText}
                        resetTitle={_resetTitle}
                        resetSuccessText={_resetSuccessText}
                        email={email}
                        password={password}
                        onClose={this.toggleModal}
                        onChangeEmail={this.onChangeEmail}
                        onChangePassword={this.onChangePassword}
                        onSubmitEmail={this.submitEmail}
                        onSubmitPassword={this.submitPassword}
                        errorMessage={errorMessage} />
                </>
            );
        }
    }

    return withAsyncCaller(WithForgotPassword);
}
