import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ActivityIndicator from './ActivityIndicator';
import { castArray } from './utils/castArray';
import { classify } from './utils/classify';

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
        isValid: PropTypes.bool,
        isInvalid: PropTypes.bool,
        childrenLeft: PropTypes.any,
        childrenRight: PropTypes.any,
        childrenToggle: PropTypes.any,
        placeholder: PropTypes.string,
        placeholderInput: PropTypes.string,
        onChangeInput: PropTypes.func,
        renderActiveItemContent: PropTypes.func
    }

    static defaultProps = {
        ...ItemPickerGlobalDefaultProps,
        style: {},
        isItemPicker: true,
        isToggle: true,
        isValid: false,
        isInvalid: false,
        isInput: false,
        childrenLeft: null,
        childrenRight: null,
        childrenToggle: null,
        placeholder: '',
        placeholderInput: '...',
        onChangeInput: null,
        renderActiveItemContent: null,
        domPortalNode: window.document.body,
        ...(window._ItemPickerView_defaultProps || {})
    }

    constructor(props) {
        super(props);

        const { value, items, maxSelections } = props;
        const valueArray = castArray(value);
        const filterItem = (item) => valueArray.indexOf(item.id) > -1;
        const selectedItems = items.filter(filterItem);
        const isSingleSelection = typeof value === 'number' || maxSelections === 1;

        this.REF_CONTAINER = React.createRef();
        this.focusInput = null;
        this.state = {
            isItemPickerVisible: false,
            selectedItems,
            isSingleSelection,
            isMaxSelected: isSingleSelection || (maxSelections && maxSelections <= selectedItems.length),
            itemPickerStyle: {}
        };
    }

    componentDidUpdate(prevProps) {
        const { value, items, maxSelections } = this.props;

        if (JSON.stringify(value) !== JSON.stringify(prevProps.value) ||
            JSON.stringify(items) !== JSON.stringify(prevProps.items)) {
            const valueArray = castArray(value);
            const filterItem = (item) => valueArray.indexOf(item.id) > -1;
            const selectedItems = items.filter(filterItem);
            const isSingleSelection = typeof value === 'number' || maxSelections === 1;

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
        const { domPortalNode } = this.props;
        const { isItemPickerVisible } = this.state;
        const itemPickerStyle = {};

        if (domPortalNode !== null) {
            itemPickerStyle.top = 0;
            itemPickerStyle.left = 0;
            itemPickerStyle.maxWidth = 200;

            if (this.REF_CONTAINER.current) {
                const { top, left, width, height } = this.REF_CONTAINER.current.getBoundingClientRect();

                itemPickerStyle.top = top + height;
                itemPickerStyle.left = left;
                itemPickerStyle.maxWidth = width;
            }
        }

        this.setState({
            isItemPickerVisible: !isItemPickerVisible,
            itemPickerStyle
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
        const { renderItemContent, renderActiveItemContent, itemsNameKey } = this.props;
        const { isSingleSelection } = this.state;
        const { id, [itemsNameKey]: name } = item;
        const renderContent = renderActiveItemContent || renderItemContent;

        return (
            <ItemPickerViewItem
                key={id}
                {...item}
                isSingleSelection={isSingleSelection}
                item={item}
                onRemove={this.onRemoveItem}>
                {renderContent ? renderContent(item) : name}
            </ItemPickerViewItem>
        );
    }

    render() {
        const {
            className, items, itemsNameKey, itemsSearchConfig, childrenLeft, childrenRight,
            isProcessing, placeholder, onClick, isInput, isToggle, placeholderInput, onChangeInput, childrenToggle,
            isItemPicker, isValid, isInvalid, style
        } = this.props;
        const { selectedItems, isMaxSelected, isSingleSelection, isItemPickerVisible, itemPickerStyle } = this.state;
        const isRenderInput = isInput && !isMaxSelected;
        const onClickFunc = isItemPicker ? this.onToggleItemPicker : onClick;
        const classNames = {
            items: '',
            items__isValid: '',
            itemsWrapper: '',
            itemsWrapperProcessing: '',
            itemsWrapperPlaceholder: '',
            dropdown: '',
            itempicker: ''
        };

        if (className) {
            classNames.items = classify(className, '__items');
            classNames.items__isValid = classify(className, '__items--isValid');
            classNames.items__isInvalid = classify(className, '__items--isInvalid');
            classNames.itemsWrapper = classify(className, '__items-wrapper');
            classNames.itemsWrapperProcessing = classify(className, '__items-wrapper-processing');
            classNames.itemsWrapperPlaceholder = classify(className, '__items-wrapper-placeholder');
            classNames.dropdown = classify(className, '__dropdown');
            classNames.itempicker = classify(className, '__ItemPicker');
        }

        return (
            <div
                ref={this.REF_CONTAINER}
                className={`
                    ItemPickerView
                    ${isSingleSelection ? 'ItemPickerView--isSingleSelection' : ''}
                    ${className}
                `}
                style={style}>
                {childrenLeft}

                <div
                    className={`
                        ItemPickerView__items
                        ${isSingleSelection ? 'ItemPickerView__items--isSingleSelection' : ''}
                        ${isRenderInput ? 'ItemPickerView__items--isInput' : ''}
                        ${isInvalid ? `ItemPickerView__items--isInvalid ${classNames.items__isInvalid}` : isValid ? `ItemPickerView__items--isValid ${classNames.items__isValid}` : ''}
                        ${classNames.items}
                    `}
                    onClick={isRenderInput ? this.onFocusInput : onClickFunc}>
                    <div
                        className={`
                            ItemPickerView__items-wrapper
                            ${isSingleSelection ? 'ItemPickerView__items-wrapper--isSingleSelection' : ''}
                            ${classNames.itemsWrapper}
                        `}>
                        {isProcessing && (
                            <div
                                className={`
                                    ItemPickerView__items-wrapper-processing
                                    ${classNames.itemsWrapperProcessing}
                                `}>
                                <ActivityIndicator size={20} />
                            </div>
                        )}

                        {selectedItems.length
                            ? selectedItems.map(this.renderItem)
                            : !!(isSingleSelection && !isProcessing) && (
                                <div
                                    className={`
                                        ItemPickerView__items-wrapper-placeholder
                                        ${classNames.itemsWrapperPlaceholder}
                                    `}>
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
                        className={`
                            ItemPickerView__dropdown
                            ${classNames.dropdown}
                        `}
                        onClick={onClickFunc}>
                        {childrenToggle || <FontAwesomeIcon icon={faCaretDown} />}
                    </div>
                )}

                {childrenRight}

                {isItemPicker && (
                    <ItemPicker
                        {...this.props}
                        style={itemPickerStyle}
                        className={`
                            ItemPickerView__ItemPicker
                            ${classNames.itempicker}
                        `}
                        isVisible={isItemPickerVisible}
                        onClose={this.onToggleItemPicker} />
                )}
            </div>
        );
    }
}
