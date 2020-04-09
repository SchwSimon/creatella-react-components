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
    static propTypes = {
        isProcessing: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
        isValidEmail: PropTypes.bool.isRequired,
        isValidPassword: PropTypes.bool.isRequired,
        isResetCode: PropTypes.bool.isRequired,
        isRenderStrengthMeter: PropTypes.bool.isRequired,

        //
        zxcvbn: PropTypes.func,

        // data
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,

        // change handlers
        onClose: PropTypes.func.isRequired,
        onBackToRequestUI: PropTypes.func.isRequired,
        onChangeEmail: PropTypes.func.isRequired,
        onChangePassword: PropTypes.func.isRequired,

        // Text
        emailTitle: PropTypes.string.isRequired,
        emailInputLabel: PropTypes.string.isRequired,
        emailInputPlaceholder: PropTypes.string.isRequired,
        emailSubmit: PropTypes.string.isRequired,
        emailSuccess: PropTypes.string.isRequired,
        passwordTitle: PropTypes.string.isRequired,
        passwordInputLabel: PropTypes.string.isRequired,
        passwordInputPlaceholder: PropTypes.string.isRequired,
        passwordSubmit: PropTypes.string.isRequired,
        passwordSuccess: PropTypes.string.isRequired,
        passwordRequestNewEmail: PropTypes.string.isRequired,
        backToLogin: PropTypes.string.isRequired
    }

    static defaultProps = {
        emailTitle: 'Forgot your password ?',
        emailInputLabel: 'Enter your email',
        emailInputPlaceholder: 'e-mail@email.com',
        emailSubmit: 'Confirm',
        emailSuccess: 'An email with further instructions has been sent to you.',
        passwordTitle: 'Set a new password',
        passwordInputLabel: 'Enter your new password',
        passwordInputPlaceholder: '******',
        passwordSubmit: 'Confirm',
        passwordSuccess: 'You can now login with your new password.',
        passwordRequestNewEmail: 'Click here to request a new password reset.',
        backToLogin: 'Back to Login'
    }

    constructor(props) {
        super(props);

        this.state = {
            isPasswordVisible: false
        };
    }

    onTogglePasswordVisibility = () => {
        const { isPasswordVisible } = this.state;

        this.setState({ isPasswordVisible: !isPasswordVisible });
    }

    renderRequestUI = () => {
        const {
            isProcessing, isSuccess, isValidEmail,
            emailTitle, emailInputLabel, emailInputPlaceholder, emailSubmit, emailSuccess,
            email, onChangeEmail, onSubmitEmail
        } = this.props;

        return (
            <div className='ModalForgotPassword'>
                <div className='ModalForgotPassword__title'>
                    {emailTitle}
                </div>

                <div className='ModalForgotPassword__content'>
                    {!isSuccess && (
                        <label
                            className='ModalForgotPassword__content-label'
                            htlmfor='ModalForgotPassword__content-inputGroup-input'>
                            {emailInputLabel}
                        </label>
                    )}

                    <InputGroup className='ModalForgotPassword__content-inputGroup'>
                        <Input
                            id='ModalForgotPassword__content-inputGroup-input'
                            className={`ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`}
                            isDisabled={isProcessing || isSuccess}
                            isReadOnly={isSuccess}
                            isValid={isValidEmail && !isSuccess}
                            type='email'
                            autoComplete='email'
                            value={email}
                            placeholder={emailInputPlaceholder}
                            onChange={onChangeEmail} />
                    </InputGroup>
                </div>

                <div className='ModalForgotPassword__footer'>
                    {isSuccess
                        ? <div className='ModalForgotPassword__footer-success'>
                            {emailSuccess}
                        </div>
                        : <Button
                            className='ModalForgotPassword__button ModalForgotPassword__button--confirm'
                            label={emailSubmit}
                            isDisabled={!isValidEmail}
                            isProcessing={isProcessing}
                            onClick={onSubmitEmail} />
                    }
                </div>
            </div>
        );
    }

    renderResetUI = () => {
        const {
            isProcessing, isRenderStrengthMeter, isSuccess, isValidPassword,
            passwordTitle, passwordInputLabel, passwordInputPlaceholder, passwordSubmit,
            passwordSuccess, passwordRequestNewEmail, backToLogin,
            onChangePassword, onSubmitPassword, onClose, onBackToRequestUI,
            email, password, zxcvbn
        } = this.props;
        const { isPasswordVisible } = this.state;

        return (
            <div className='ModalForgotPassword'>
                <div className='ModalForgotPassword__title'>
                    {passwordTitle}
                </div>

                <div className='ModalForgotPassword__content'>
                    {!isSuccess && (
                        <label
                            className='ModalForgotPassword__content-label'
                            htlmfor='ModalForgotPassword__content-inputGroup-input'>
                            {passwordInputLabel}
                        </label>
                    )}

                    <Input
                        className='ModalForgotPassword__content-hiddenEmailInput'
                        type='email'
                        value={email} />

                    <InputGroup className='ModalForgotPassword__content-inputGroup'>
                        <Input
                            id='ModalForgotPassword__content-inputGroup-input'
                            className={`ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`}
                            type={isPasswordVisible ? 'text' : 'password'}
                            isDisabled={isProcessing || isSuccess}
                            isReadOnly={isSuccess}
                            value={password}
                            placeholder={passwordInputPlaceholder}
                            onChange={onChangePassword} />

                        <Button
                            className='ModalForgotPassword__content-inputGroup-passwordToggle'
                            onClick={this.onTogglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </Button>
                    </InputGroup>

                    {isRenderStrengthMeter && (
                        <PasswordStrengthMeter
                            className='ModalForgotPassword__content-PasswordStrengthMeter'
                            zxcvbn={zxcvbn}
                            password={password} />
                    )}
                </div>

                <div className='ModalForgotPassword__footer'>
                    {isSuccess
                        ? <div className='ModalForgotPassword__footer-success'>
                            {passwordSuccess}

                            <Button
                                className='ModalForgotPassword__button ModalForgotPassword__button--toLogin'
                                label={backToLogin}
                                onClick={onClose} />
                        </div>
                        : <Button
                            className='ModalForgotPassword__button ModalForgotPassword__button--confirm'
                            label={passwordSubmit}
                            isDisabled={!isValidPassword}
                            isProcessing={isProcessing}
                            onClick={onSubmitPassword} />
                    }

                    <Button
                        className='ModalForgotPassword__button ModalForgotPassword__button--backToRequestUI'
                        label={passwordRequestNewEmail}
                        onClick={onBackToRequestUI} />
                </div>
            </div>
        );
    }

    render() {
        const { isProcessing, isVisible, isResetCode, onClose } = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <Modal
                isVisible={isVisible}
                onClose={!isProcessing ? onClose : null}>
                {isResetCode
                    ? this.renderResetUI()
                    : this.renderRequestUI()
                }
            </Modal>
        );
    }
}
