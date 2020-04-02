import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Fuse from 'fuse.js';
import OutsideClick from './OutsideClick';
import ActivityIndicator from './ActivityIndicator';
import { castArray } from './utils/castArray';

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
        searchPlaceholderText: PropTypes.string,
        domPortalNode: PropTypes.any, // A native dom node
        style: PropTypes.object
    }

    static defaultProps = {
        ...ItemPickerGlobalDefaultProps,
        outsideClickEvent: 'click',
        onClose: () => {},
        searchRenderItemTreshold: 8,
        emptyText: 'No items yet',
        emptySearchText: 'No matches',
        searchPlaceholderText: 'Search..',
        style: {}
    }

    constructor(props) {
        super(props);

        const { value, items, searchRenderItemTreshold } = props;

        this.state = {
            isSearch: items.length > searchRenderItemTreshold,
            valueArray: castArray(value),
            search: '',
            searchItems: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { value, items, searchRenderItemTreshold } = this.props;

        if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
            this.setState({
                valueArray: castArray(value)
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
        const { maxSelections, minSelections, onChange, value } = this.props;

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
        const { valueArray } = this.state;
        const { id, [itemsNameKey]: name } = item;
        const isActive = valueArray.indexOf(id) > -1;

        return (
            <ItemPickerItem
                key={id}
                {...item}
                item={item}
                onSelect={this.onSelectItem}
                isActive={isActive}
                content={renderItemContent ? renderItemContent(item, isActive) : name} />
        );
    }

    render() {
        const {
            isVisible, isProcessing, items, onClose, className, outsideClickEvent, onChangeSearch,
            emptyText, emptySearchText, searchPlaceholderText, domPortalNode, style
        } = this.props;
        const { isSearch, search, searchItems } = this.state;
        const renderItems = search ? searchItems : items;
        const classNames = { items: '', itemsEmpty: '', itemsProcessing: '', empty: '' };

        if (!isVisible) {
            return null;
        }

        if (className) {
            classNames.items = `${className}__items`;
            classNames.itemsEmpty = `${className}__items-empty`;
            classNames.itemsProcessing = `${className}__items-processing`;
            classNames.empty = `${className}__empty`;
        }

        const JSX = (
            <OutsideClick
                className={`ItemPicker ${className}`}
                style={style}
                event={outsideClickEvent}
                onOutsideClick={onClose}>
                {isSearch && (
                    <ItemPickerSearch
                        placeholder={searchPlaceholderText}
                        onChange={onChangeSearch || this.onChangeSearch} />
                )}

                <div className={`ItemPicker__items ${classNames.items}`}>
                    {renderItems.length
                        ? renderItems.map(this.renderItem)
                        : (!search && !!emptyText) && (
                            <div className={`ItemPicker__items-empty ${classNames.itemsEmpty}`}>
                                {emptyText}
                            </div>
                        )
                    }

                    {isProcessing && (
                        <div className={`ItemPicker__items-processing ${classNames.itemsProcessing}`}>
                            <ActivityIndicator size={20} />
                        </div>
                    )}
                </div>

                {!!(search && !searchItems.length) && (
                    <div className={`ItemPicker__empty ${classNames.empty}`}>
                        {emptySearchText}
                    </div>
                )}
            </OutsideClick>
        );

        return domPortalNode ? createPortal(JSX, domPortalNode) : JSX;
    }
}
