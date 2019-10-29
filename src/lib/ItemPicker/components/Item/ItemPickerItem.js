import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './ItemPickerItem.scss';

export default class ItemPickerItem extends PureComponent {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
        content: PropTypes.any.isRequired,
        item: PropTypes.object.isRequired,
        isActive: PropTypes.bool.isRequired
    }

    onClick = () => {
        const { onSelect, id, item } = this.props;

        onSelect(id, item);
    }

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
