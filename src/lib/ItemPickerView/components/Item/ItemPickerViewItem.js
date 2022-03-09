import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class ItemPickerViewItem extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        isSingleSelection: PropTypes.bool,
        onRemove: PropTypes.func,
        onClick: PropTypes.func,
        item: PropTypes.object.isRequired,
        children: PropTypes.any.isRequired
    };

    static defaultProps = {
        className: '',
        style: {}
    };

    onClick = (e) => {
        const { isSingleSelection, onClick, onRemove, item } = this.props;

        e.stopPropagation();

        if (onClick) {
            onClick(item);
        } else if (!isSingleSelection) {
            onRemove(item);
        }
    };

    render() {
        const { className, style, isSingleSelection, children } = this.props;

        return (
            <div
                className={`
                    ItemPickerViewItem
                    ${className}
                    ${isSingleSelection ? 'ItemPickerViewItem--isSingleSelection' : ''}
                `}
                style={style}
                onClick={this.onClick}>
                <span className='ItemPickerViewItem__content'>
                    {children}
                </span>
            </div>
        );
    }
}
