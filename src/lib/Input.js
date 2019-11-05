import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class Input extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        isReadOnly: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isValid: PropTypes.bool,
        isInvalid: PropTypes.bool,
        isTextArea: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        isReadOnly: false,
        isDisabled: false,
        isValid: false,
        isInvalid: false,
        isTextArea: false
    }

    render() {
        const { className, isReadOnly, isDisabled, isValid, isInvalid, isTextArea, ...props } = this.props;

        if (isTextArea) {
            return (
                <textarea
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    {...props}
                    className={`Input Input--textarea ${isInvalid ? 'Input--isInvalid' : isValid ? 'Input--isValid' : ''} ${className}`} />
            );
        }

        return (
            <input
                readOnly={isReadOnly}
                disabled={isDisabled}
                {...props}
                className={`Input ${isInvalid ? 'Input--isInvalid' : isValid ? 'Input--isValid' : ''} ${className}`} />
        );
    }
}
