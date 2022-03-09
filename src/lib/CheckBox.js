import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { classify } from './utils/classify';

export default class CheckBox extends PureComponent {
    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        isSwitch: PropTypes.bool,
        onChange: PropTypes.func,
        className: PropTypes.string,
        label: PropTypes.any,
        children: PropTypes.any,
        value: PropTypes.any
    };

    static defaultProps = {
        isSwitch: false,
        className: '',
        label: ''
    };

    onChange = () => {
        const { onChange, isChecked, value } = this.props;

        onChange(isChecked, value);
    };

    render() {
        const { className, isSwitch, onChange, isChecked, label, children } = this.props;
        const classNames = {
            switch: '',
            switchDot: '',
            box: '',
            boxCheck: '',
            label: '',
            switchChecked: '',
            switchDotChecked: '',
            boxChecked: '',
            boxCheckChecked: '',
            labelChecked: ''
        };

        if (className) {
            classNames.switch = classify(className, '__switch');
            classNames.switchDot = classify(className, '__switch-dot');
            classNames.box = classify(className, '__box');
            classNames.boxCheck = classify(className, '__box-check');
            classNames.label = classify(className, '__label');

            if (isChecked) {
                classNames.switchChecked = classify(className, '__switch--checked');
                classNames.switchDotChecked = classify(className, '__switch-dot--checked');
                classNames.boxChecked = classify(className, '__box--checked');
                classNames.boxCheckChecked = classify(className, '__box-check--checked');
                classNames.labelChecked = classify(className, '__label--checked');
            }
        }

        return (
            <div
                className={`CheckBox ${className}`}
                onClick={onChange && this.onChange}>
                {isSwitch
                    ? <div
                        className={`
                            CheckBox__switch
                            ${isChecked ? 'CheckBox__switch--checked' : ''}
                            ${classNames.switch}
                            ${classNames.switchChecked}
                        `}>
                        <div
                            className={`
                                CheckBox__switch-dot
                                ${isChecked ? 'CheckBox__switch-dot--checked' : ''}
                                ${classNames.switchDot}
                                ${classNames.switchDotChecked}
                            `} />
                    </div>
                    : <div
                        className={`
                            CheckBox__box
                            ${isChecked ? 'CheckBox__box--checked' : ''}
                            ${classNames.box}
                            ${classNames.boxChecked}
                        `}>
                        <FontAwesomeIcon
                            className={`
                                CheckBox__box-check
                                ${isChecked ? 'CheckBox__box-check--checked' : ''}
                                ${classNames.boxCheck}
                                ${classNames.boxCheckChecked}
                            `}
                            icon={faCheck} />
                    </div>
                }

                {children || (!!label && (
                    <div
                        className={`
                            CheckBox__label
                            ${isChecked ? 'CheckBox__label--checked' : ''}
                            ${classNames.label}
                            ${classNames.labelChecked}
                        `}>
                        {label}
                    </div>
                ))}
            </div>
        );
    }
}
