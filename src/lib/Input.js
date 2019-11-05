import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class Input extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        classNameValid: PropTypes.string,
        classNameInvalid: PropTypes.string,
        isReadOnly: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isValid: PropTypes.bool,
        isInvalid: PropTypes.bool,
        isTextArea: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        classNameValid: '',
        classNameInvalid: '',
        isReadOnly: false,
        isDisabled: false,
        isValid: false,
        isInvalid: false,
        isTextArea: false
    }

    render() {
        const {
            className, classNameValid, classNameInvalid,
            isReadOnly, isDisabled, isValid, isInvalid, isTextArea,
            ...props
        } = this.props;

        let classNamesInvalid = '';
        let classNamesValid = '';

        if (isInvalid) {
            classNamesInvalid = `Input--isInvalid ${classNameInvalid}`;
        } else if (isValid) {
            classNamesValid = `Input--isValid ${classNameValid}`;
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
