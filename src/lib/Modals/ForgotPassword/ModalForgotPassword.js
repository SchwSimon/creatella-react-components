import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../Modal';
import InputGroup from '../../InputGroup';
import Input from '../../Input';
import Button from '../../Button';

// TODO: add at the bottom of the reset UI:
// Click here to request a new password reset <-- toggle to the email UI
// add mobile styles
export default class ModalForgotPassword extends PureComponent {
    static propTypes = {
        isProcessing: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
        isValidEmail: PropTypes.bool.isRequired,
        isValidPassword: PropTypes.bool.isRequired,
        isResetCode: PropTypes.bool.isRequired,
        requestTitle: PropTypes.string.isRequired,
        requestSuccessText: PropTypes.string.isRequired,
        resetTitle: PropTypes.string.isRequired,
        resetSuccessText: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
        onChangeEmail: PropTypes.func.isRequired,
        onChangePassword: PropTypes.func.isRequired,
        errorMessage: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            isPasswordVisible: false
        };
    }

    onTogglePasswordVisibility = () => {
        const { isPasswordVisible } = this.state;

        this.setState({
            isPasswordVisible: !isPasswordVisible
        });
    }

    renderRequestUI = () => {
        const {
            isProcessing, isSuccess, isValidEmail, requestTitle, requestSuccessText,
            email, onChangeEmail, onSubmitEmail, errorMessage
        } = this.props;

        return (
            <div className='ModalForgotPassword'>
                <div className='ModalForgotPassword__title'>
                    {requestTitle}
                </div>

                <div className='ModalForgotPassword__content'>
                    {!isSuccess && (
                        <label
                            className='ModalForgotPassword__content-label'
                            htlmfor='ModalForgotPassword__content-inputGroup-input'>
                            Enter your email
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
                            placeholder='E-Mail'
                            onChange={onChangeEmail} />
                    </InputGroup>

                    <div className='ModalForgotPassword__content-error'>
                        {errorMessage}
                    </div>
                </div>

                <div className='ModalForgotPassword__footer'>
                    {isSuccess
                        ? <div className='ModalForgotPassword__footer-success'>
                            {requestSuccessText}
                        </div>
                        : <Button
                            className='ModalForgotPassword__button ModalForgotPassword__button--confirm'
                            label='Confirm'
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
            isProcessing, isSuccess, isValidPassword, resetTitle, resetSuccessText,
            password, onChangePassword, onSubmitPassword, onClose, errorMessage
        } = this.props;
        const { isPasswordVisible } = this.state;

        return (
            <div className='ModalForgotPassword'>
                <div className='ModalForgotPassword__title'>
                    {resetTitle}
                </div>

                <div className='ModalForgotPassword__content'>
                    {!isSuccess && (
                        <label
                            className='ModalForgotPassword__content-label'
                            htlmfor='ModalForgotPassword__content-inputGroup-input'>
                            Enter your new password
                        </label>
                    )}

                    <InputGroup className='ModalForgotPassword__content-inputGroup'>
                        <Input
                            id='ModalForgotPassword__content-inputGroup-input'
                            className={`ModalForgotPassword__content-inputGroup-input ${isSuccess ? 'ModalForgotPassword__content-inputGroup-input--success' : ''}`}
                            type={isPasswordVisible ? 'text' : 'password'}
                            isDisabled={isProcessing || isSuccess}
                            isReadOnly={isSuccess}
                            value={password}
                            placeholder='Password'
                            onChange={onChangePassword} />

                        <Button
                            className='ModalForgotPassword__content-inputGroup-passwordToggle'
                            onClick={this.onTogglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </Button>
                    </InputGroup>

                    <div className='ModalForgotPassword__content-error'>
                        {errorMessage}
                    </div>
                </div>

                <div className='ModalForgotPassword__footer'>
                    {isSuccess
                        ? <div className='ModalForgotPassword__footer-success'>
                            {resetSuccessText}

                            <Button
                                className='ModalForgotPassword__button ModalForgotPassword__button--toLogin'
                                label='Back to Login'
                                onClick={onClose} />
                        </div>
                        : <Button
                            className='ModalForgotPassword__button ModalForgotPassword__button--confirm'
                            label='Confirm'
                            isDisabled={!isValidPassword}
                            isProcessing={isProcessing}
                            onClick={onSubmitPassword} />
                    }
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
