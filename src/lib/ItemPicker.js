import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';
import OutsideClick from 'lib/OutsideClick';
import ActivityIndicator from 'lib/ActivityIndicator';
import { castArray } from 'lib/utils/castArray';

// Config
import { ItemPickerGlobalPropTypes, ItemPickerGlobalDefaultProps } from './configs/ItemPickerConfig';

// ItemPicker
import ItemPickerItem from './ItemPicker/components/Item/ItemPickerItem';
import ItemPickerSearch from './ItemPicker/components/Search/ItemPickerSearch';
import { computeItemPickerChangeValue } from './ItemPicker/utils/computeItemPickerChangeValue';

export default class ItemPicker extends PureComponent {
    static propTypes = {
        ...ItemPickerGlobalPropTypes,
        isVisible: PropTypes.bool.isRequired,
        onClose: PropTypes.func,
        outsideClickEvent: PropTypes.string,
        searchRenderItemTreshold: PropTypes.number,
        emptyText: PropTypes.string,
        emptySearchText: PropTypes.string,
        searchPlaceholderText: PropTypes.string
    }

    static defaultProps = {
        ...ItemPickerGlobalDefaultProps,
        outsideClickEvent: 'click',
        onClose: () => {},
        searchRenderItemTreshold: 8,
        emptyText: 'No items yet',
        emptySearchText: 'No matches',
        searchPlaceholderText: 'Search..'
    }

    constructor(props) {
        super(props);

        const { value, items, searchRenderItemTreshold } = props;

        this.state = {
            isSearch: items.length > searchRenderItemTreshold,
            value: castArray(value),
            search: '',
            searchItems: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { value, items, searchRenderItemTreshold } = this.props;

        if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
            this.setState({
                value: castArray(value)
            });
        }

        if (prevProps.items.length !== items.length) {
            const isSearch = items.length > searchRenderItemTreshold;

            if (prevState.isSearch !== isSearch) {
                this.setState({ isSearch });
            }
        }
    }

    onSelectItem = (item) => {
        const { maxSelections, minSelections, onChange } = this.props;
        const { value } = this.state;

        const nextValue = computeItemPickerChangeValue({
            item,
            value,
            maxSelections,
            minSelections
        });

        if (nextValue !== false) {
            onChange(nextValue, item);
        }
    }

    onChangeSearch = (search) => {
        const { items, itemsNameKey, itemsSearchConfig } = this.props;

        search = search.toLowerCase();

        if (!search) {
            this.setState({
                search,
                searchItems: []
            });

            return;
        }

        const fuseConfig = itemsSearchConfig || { keys: [itemsNameKey] };
        const fuse = new Fuse(items, fuseConfig);
        const results = fuse.search(search);

        this.setState({
            search,
            searchItems: results
        });
    }

    renderItem = (item) => {
        const { renderItemContent, itemsNameKey } = this.props;
        const { value } = this.state;
        const { id, [itemsNameKey]: name } = item;

        return (
            <ItemPickerItem
                key={id}
                {...item}
                item={item}
                onSelect={this.onSelectItem}
                isActive={value.indexOf(id) > -1}
                content={renderItemContent ? renderItemContent(item) : name} />
        );
    }

    render() {
        const {
            isVisible, isProcessing, items, onClose, className, outsideClickEvent,
            emptyText, emptySearchText, searchPlaceholderText
        } = this.props;
        const { isSearch, search, searchItems } = this.state;
        const renderItems = search ? searchItems : items;

        if (!isVisible) {
            return null;
        }

        return (
            <OutsideClick
                className={`ItemPicker ${className}`}
                event={outsideClickEvent}
                onOutsideClick={onClose}>
                {isSearch && (
                    <ItemPickerSearch
                        placeholder={searchPlaceholderText}
                        onChange={this.onChangeSearch} />
                )}

                <div className='ItemPicker__items'>
                    {renderItems.length
                        ? renderItems.map(this.renderItem)
                        : !search && (
                            <div className='ItemPicker__empty'>
                                {emptyText}
                            </div>
                        )
                    }

                    {isProcessing && (
                        <div className='ItemPicker__processing'>
                            <ActivityIndicator size={20} />
                        </div>
                    )}
                </div>

                {!!(search && !searchItems.length) && (
                    <div className='ItemPicker__empty'>
                        {emptySearchText}
                    </div>
                )}
            </OutsideClick>
        );
    }
}
