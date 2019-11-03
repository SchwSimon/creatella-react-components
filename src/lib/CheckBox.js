import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default class CheckBox extends PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        isSwitch: PropTypes.bool,
        onChange: PropTypes.func,
        className: PropTypes.string,
        label: PropTypes.string,
        children: PropTypes.any,
        value: PropTypes.any
    }

    static defaultProps = {
        isSwitch: false,
        className: '',
        label: ''
    }

    onChange = () => {
        const { onChange, isChecked, value } = this.props;

        onChange(isChecked, value);
    }

    render() {
        const { className, isSwitch, onChange, isChecked, label, children } = this.props;

        return (
            <div
                className={`CheckBox ${className}`}
                onClick={onChange && this.onChange}>
                {isSwitch
                    ? <div className={`CheckBox__switch ${isChecked ? 'CheckBox__switch--checked' : ''}`}>
                        <div className={`CheckBox__switch-dot ${isChecked ? 'CheckBox__switch-dot--checked' : ''}`} />
                    </div>
                    : <div className={`CheckBox__box ${isChecked ? 'CheckBox__box--checked' : ''}`}>
                        <FontAwesomeIcon
                            className={`CheckBox__box-check ${isChecked ? 'CheckBox__box-check--checked' : ''}`}
                            icon={faCheck} />
                    </div>
                }

                {children || (!!label && (
                    <div className='CheckBox__label'>
                        {label}
                    </div>
                ))}
            </div>
        );
    }
}
