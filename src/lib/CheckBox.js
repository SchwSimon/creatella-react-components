import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './CheckBox/CheckBox.scss';

export default class CheckBox extends PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        onChange: PropTypes.func,
        className: PropTypes.string,
        label: PropTypes.string,
        children: PropTypes.any,
        value: PropTypes.any
    }

    static defaultProps = {
        className: '',
        label: ''
    }

    onChange = () => {
        const { onChange, isChecked, value } = this.props;

        onChange(isChecked, value);
    }

    render() {
        const { className, onChange, isChecked, label, children } = this.props;

        return (
            <div
                className={`CheckBox ${className}`}
                onClick={onChange && this.onChange}>
                <div className={`CheckBox__box ${isChecked ? 'CheckBox__box--checked' : ''}`}>
                    <FontAwesomeIcon
                        className={`CheckBox__box-check ${isChecked ? 'CheckBox__box-check--checked' : ''}`}
                        icon={faCheck} />
                </div>

                {children || (!!label && (
                    <div className='CheckBox__label'>
                        {label}
                    </div>
                ))}
            </div>
        );
    }
}
