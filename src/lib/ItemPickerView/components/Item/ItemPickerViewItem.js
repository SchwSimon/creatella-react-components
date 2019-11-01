import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class ItemPickerViewItem extends PureComponent {
    static propTypes = {
        isSingleSelection: PropTypes.bool.isRequired,
        onRemove: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        content: PropTypes.any.isRequired
    }

    onRemove = (e) => {
        const { onRemove, item } = this.props;

        e.stopPropagation();

        onRemove(item);
    }

    render() {
        const { isSingleSelection, content } = this.props;

        return (
            <div
                className={`ItemPickerViewItem ${isSingleSelection ? 'ItemPickerViewItem--isSingleSelection' : ''}`}
                onClick={!isSingleSelection ? this.onRemove : null}>
                <span className='ItemPickerViewItem__content'>
                    {content}
                </span>
            </div>
        );
    }
}
