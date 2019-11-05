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
        const prefixValid = '--isValid';
        const prefixInvalid = '--isInvalid';

        let classNamesInvalid = '';
        let classNamesValid = '';

        if (isInvalid) {
            classNamesInvalid = `Input${prefixInvalid} ${className ? `${className}${prefixInvalid}` : ''}`;
        } else if (isValid) {
            classNamesValid = `Input${prefixValid} ${className ? `${className}${prefixValid}` : ''}`;
        }

        if (isTextArea) {
            return (
                <textarea
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    {...props}
                    className={`Input Input--textarea ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`} />
            );
        }

        return (
            <input
                readOnly={isReadOnly}
                disabled={isDisabled}
                {...props}
                className={`Input ${className} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`} />
        );
    }
}
