import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import OutsideClick from 'lib/OutsideClick';

// ItemPicker
import ItemPickerItem from './ItemPicker/components/Item/ItemPickerItem';
import ItemPickerSearch from './ItemPicker/components/Search/ItemPickerSearch';
import { getStateValueByPropsValue } from './ItemPicker/utils/helpers';
import './ItemPicker/ItemPicker.scss';

export default class ItemPicker extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        onClose: PropTypes.func,
        items: PropTypes.array,
        itemsNameKey: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        maxSelections: PropTypes.number,
        minSelections: PropTypes.number,
        className: PropTypes.string,
        renderItemContent: PropTypes.func,
        searchRenderItemTreshold: PropTypes.number,
        emptyText: PropTypes.string,
        emptySearchText: PropTypes.string,
        searchPlaceholderText: PropTypes.string
    }

    static defaultProps = {
        onClose: () => {},
        items: [],
        itemsNameKey: 'name',
        maxSelections: null,
        minSelections: 0,
        className: '',
        renderItemContent: null,
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
            value: getStateValueByPropsValue(value),
            search: '',
            searchItems: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { value, items, searchRenderItemTreshold } = this.props;

        if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
            this.setState({
                value: getStateValueByPropsValue(value)
            });
        }

        if (prevProps.items.length !== items.length) {
            const isSearch = items.length > searchRenderItemTreshold;

            if (prevState.isSearch !== isSearch) {
                this.setState({ isSearch });
            }
        }
    }

    onSelectItem = (id, item) => {
        const { maxSelections, minSelections, onChange } = this.props;
        const { value } = this.state;

        if (maxSelections === 1) {
            if (minSelections === 1) {
                onChange(id, item);

                return;
            }

            onChange(value.indexOf(id) > -1 ? null : id, item);

            return;
        }

        const filterId = (_id) => _id !== id;
        const nextValue = value.indexOf(id) > -1 ? value.filter(filterId) : value.concat(id);

        // DO NOTHING:
        // if selected less than the minimum
        // if a maximum is set
        // '- AND if selected more than the maximum
        // '- AND if the selected is more than the current
        //  '-> always let the user unselect from the max, even if there are more selected than the maximum
        if (nextValue.length < minSelections || (maxSelections && nextValue.length > maxSelections && nextValue.length > value.length)) {
            return;
        }

        onChange(nextValue, item);
    }

    onChangeSearch = (search) => {
        const { items } = this.props;

        search = search.toLowerCase();

        if (!search) {
            this.setState({
                search,
                searchItems: []
            });

            return;
        }

        const filterItem = (item) => item.name.toLowerCase().indexOf(search) > -1;

        this.setState({
            search,
            searchItems: items.filter(filterItem)
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
            isVisible, items, onClose, className,
            emptyText, emptySearchText, searchPlaceholderText
        } = this.props;
        const { isSearch, search, searchItems } = this.state;
        const itemsToRender = search ? searchItems : items;

        if (!isVisible) {
            return null;
        }

        return (
            <OutsideClick
                className={`ItemPicker ${className}`}
                onOutsideClick={onClose}>
                {isSearch && (
                    <ItemPickerSearch
                        placeholder={searchPlaceholderText}
                        onChange={this.onChangeSearch} />
                )}

                <div className='ItemPicker__items'>
                    {itemsToRender.length
                        ? itemsToRender.map(this.renderItem)
                        : !search && (
                            <div className='ItemPicker__empty'>
                                {emptyText}
                            </div>
                        )
                    }
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
