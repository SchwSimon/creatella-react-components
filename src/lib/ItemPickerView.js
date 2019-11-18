import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ActivityIndicator from './ActivityIndicator';
import { castArray } from './utils/castArray';

// Config
import { ItemPickerGlobalPropTypes, ItemPickerGlobalDefaultProps } from './configs/ItemPickerConfig';

// ItemPicker
import ItemPicker from './ItemPicker';
import { computeItemPickerChangeValue } from './ItemPicker/utils/computeItemPickerChangeValue';

// ItemPickerView
import ItemPickerViewItem from './ItemPickerView/components/Item/ItemPickerViewItem';
import ItemPickerViewInput from './ItemPickerView/components/Input/ItemPickerViewInput';

export default class ItemPickerView extends PureComponent {
    static propTypes = {
        ...ItemPickerGlobalPropTypes,
        isItemPicker: PropTypes.bool,
        isToggle: PropTypes.bool,
        isInput: PropTypes.bool,
        classNameItemPicker: PropTypes.string,
        childrenLeft: PropTypes.any,
        childrenRight: PropTypes.any,
        placeholder: PropTypes.string,
        placeholderInput: PropTypes.string,
        onChangeInput: PropTypes.func
    }

    static defaultProps = {
        ...ItemPickerGlobalDefaultProps,
        isItemPicker: true,
        isToggle: true,
        isInput: false,
        classNameItemPicker: '',
        childrenLeft: null,
        childrenRight: null,
        placeholder: '',
        placeholderInput: '...',
        onChangeInput: null
    }

    constructor(props) {
        super(props);

        const { value, items, maxSelections } = props;
        const valueArray = castArray(value);
        const filterItem = (item) => valueArray.indexOf(item.id) > -1;
        const selectedItems = items.filter(filterItem);
        const isSingleSelection = typeof value === 'number' || value === null || maxSelections === 1;

        this.focusInput = null;
        this.REF_INPUT = null;
        this.state = {
            isItemPickerVisible: false,
            selectedItems,
            isSingleSelection,
            isMaxSelected: isSingleSelection || (maxSelections && maxSelections <= selectedItems.length)
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { value, items, maxSelections } = this.props;

        if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
            const valueArray = castArray(value);
            const filterItem = (item) => valueArray.indexOf(item.id) > -1;
            const selectedItems = items.filter(filterItem);
            const isSingleSelection = typeof value === 'number' || value === null || maxSelections === 1;

            this.setState({
                selectedItems,
                isSingleSelection,
                isMaxSelected: isSingleSelection || (maxSelections && maxSelections <= selectedItems.length)
            });
        }
    }

    setFocusInputFunc = (focusInput) => {
        this.focusInput = focusInput;
    }

    onFocusInput = (e) => {
        this.focusInput && this.focusInput();
    }

    onToggleItemPicker = () => {
        const { isItemPickerVisible } = this.state;

        this.setState({
            isItemPickerVisible: !isItemPickerVisible
        });
    }

    onAddItem = (item) => {
        const { value, maxSelections, minSelections, onChange } = this.props;
        const nextValue = computeItemPickerChangeValue({
            item,
            value,
            maxSelections,
            minSelections
        });

        if (nextValue !== false) {
            // only accept adding items
            if (JSON.stringify(nextValue).length > JSON.stringify(value).length) {
                onChange(nextValue, item);

                return true;
            }
        }

        return false;
    }

    onRemoveItem = (item) => {
        const { value, maxSelections, minSelections, onChange } = this.props;
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

    renderItem = (item) => {
        const { renderItemContent, itemsNameKey } = this.props;
        const { isSingleSelection } = this.state;
        const { id, [itemsNameKey]: name } = item;

        return (
            <ItemPickerViewItem
                key={id}
                {...item}
                isSingleSelection={isSingleSelection}
                item={item}
                onRemove={this.onRemoveItem}
                content={renderItemContent ? renderItemContent(item) : name} />
        );
    }

    // TODO: see if we can fit itemPicker in here for a default setup
    // so we also with toggling logic by default
    render() {
        const {
            className, items, itemsNameKey, itemsSearchConfig, childrenLeft, childrenRight,
            isProcessing, placeholder, onClick, isInput, isToggle, placeholderInput, onChangeInput,
            isItemPicker, classNameItemPicker
        } = this.props;
        const { selectedItems, isMaxSelected, isSingleSelection, isItemPickerVisible } = this.state;
        const isRenderInput = isInput && !isMaxSelected;
        const onClickFunc = isItemPicker ? this.onToggleItemPicker : onClick;

        return (
            <div className={`ItemPickerView ${isSingleSelection ? 'ItemPickerView--isSingleSelection' : ''} ${className}`}>
                {childrenLeft}

                <div
                    className={`ItemPickerView__items ${isRenderInput ? 'ItemPickerView__items--isInput' : ''}`}
                    onClick={isRenderInput ? this.onFocusInput : onClickFunc}>
                    <div className='ItemPickerView__items-wrapper'>
                        {isProcessing && (
                            <div className='ItemPickerView__items-wrapper-processing'>
                                <ActivityIndicator size={20} />
                            </div>
                        )}

                        {selectedItems.length
                            ? selectedItems.map(this.renderItem)
                            : isSingleSelection && (
                                <div className='ItemPickerView__items-wrapper-placeholder'>
                                    {placeholder}
                                </div>
                            )
                        }

                        {isRenderInput && (
                            <ItemPickerViewInput
                                setFocusInputFunc={this.setFocusInputFunc}
                                placeholder={placeholder}
                                placeholderInput={placeholderInput}
                                items={items}
                                itemsSelected={selectedItems}
                                itemsNameKey={itemsNameKey}
                                itemsSearchConfig={itemsSearchConfig}
                                onSubmit={this.onAddItem}
                                onRemove={this.onRemoveItem}
                                onChangeInput={onChangeInput} />
                        )}
                    </div>
                </div>

                {isToggle && (
                    <div
                        className='ItemPickerView__dropdown'
                        onClick={onClickFunc}>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                )}

                {childrenRight}

                {isItemPicker && (
                    <ItemPicker
                        {...this.props}
                        className={`ItemPickerView__ItemPicker ${classNameItemPicker}`}
                        isVisible={isItemPickerVisible}
                        onClose={this.onToggleItemPicker} />
                )}
            </div>
        );
    }
}
