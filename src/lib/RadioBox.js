import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class RadioBox extends PureComponent {
    static propTypes = {
        checkedId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        className: PropTypes.string,
        onChange: PropTypes.func,
        label: PropTypes.string,
        children: PropTypes.any
    }

    static defaultProps = {
        className: '',
        label: ''
    }

    onChange = () => {
        const { onChange, id } = this.props;

        onChange(id);
    }

    render() {
        const { className, onChange, id, checkedId, label, children } = this.props;
        const isChecked = id === checkedId;

        return (
            <div
                className={`RadioBox ${className}`}
                onClick={onChange && this.onChange}>
                <div className={`RadioBox__box ${isChecked ? 'RadioBox__box--checked' : ''}`} />

                {children || (!!label && (
                    <div className='RadioBox__label'>
                        {label}
                    </div>
                ))}
            </div>
        );
    }
}
