import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class ItemPickerItem extends PureComponent {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        content: PropTypes.any.isRequired,
        item: PropTypes.object.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    onClick = () => {
        const { onSelect, item } = this.props;

        onSelect(item);
    };

    render() {
        const { content, isActive } = this.props;

        return (
            <div
                className={`ItemPickerItem ${isActive ? 'ItemPickerItem--active' : ''}`}
                onClick={this.onClick}>
                {content}
            </div>
        );
    }
}
