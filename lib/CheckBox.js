function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { classify } from './utils/classify';
export default class CheckBox extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", () => {
      const {
        onChange,
        isChecked,
        value
      } = this.props;
      onChange(isChecked, value);
    });
  }

  render() {
    const {
      className,
      isSwitch,
      onChange,
      isChecked,
      label,
      children
    } = this.props;
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

    return /*#__PURE__*/React.createElement("div", {
      className: `CheckBox ${className}`,
      onClick: onChange && this.onChange
    }, isSwitch ? /*#__PURE__*/React.createElement("div", {
      className: `
                            CheckBox__switch
                            ${isChecked ? 'CheckBox__switch--checked' : ''}
                            ${classNames.switch}
                            ${classNames.switchChecked}
                        `
    }, /*#__PURE__*/React.createElement("div", {
      className: `
                                CheckBox__switch-dot
                                ${isChecked ? 'CheckBox__switch-dot--checked' : ''}
                                ${classNames.switchDot}
                                ${classNames.switchDotChecked}
                            `
    })) : /*#__PURE__*/React.createElement("div", {
      className: `
                            CheckBox__box
                            ${isChecked ? 'CheckBox__box--checked' : ''}
                            ${classNames.box}
                            ${classNames.boxChecked}
                        `
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      className: `
                                CheckBox__box-check
                                ${isChecked ? 'CheckBox__box-check--checked' : ''}
                                ${classNames.boxCheck}
                                ${classNames.boxCheckChecked}
                            `,
      icon: faCheck
    })), children || !!label && /*#__PURE__*/React.createElement("div", {
      className: `
                            CheckBox__label
                            ${isChecked ? 'CheckBox__label--checked' : ''}
                            ${classNames.label}
                            ${classNames.labelChecked}
                        `
    }, label));
  }

}

_defineProperty(CheckBox, "propTypes", {
  isChecked: PropTypes.bool.isRequired,
  isSwitch: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.any,
  children: PropTypes.any,
  value: PropTypes.any
});

_defineProperty(CheckBox, "defaultProps", {
  isSwitch: false,
  className: '',
  label: ''
});