function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ActivityIndicator from './ActivityIndicator';
import { castArray } from './utils/castArray'; // Config

import { ItemPickerGlobalPropTypes, ItemPickerGlobalDefaultProps } from './configs/ItemPickerConfig'; // ItemPicker

import ItemPicker from './ItemPicker';
import { computeItemPickerChangeValue } from './ItemPicker/utils/computeItemPickerChangeValue'; // ItemPickerView

import ItemPickerViewItem from './ItemPickerView/components/Item/ItemPickerViewItem';
import ItemPickerViewInput from './ItemPickerView/components/Input/ItemPickerViewInput';
export default class ItemPickerView extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "setFocusInputFunc", focusInput => {
      this.focusInput = focusInput;
    });

    _defineProperty(this, "onFocusInput", e => {
      this.focusInput && this.focusInput();
    });

    _defineProperty(this, "onToggleItemPicker", () => {
      const {
        isItemPickerVisible
      } = this.state;
      this.setState({
        isItemPickerVisible: !isItemPickerVisible
      });
    });

    _defineProperty(this, "onAddItem", item => {
      const {
        value,
        maxSelections,
        minSelections,
        onChange
      } = this.props;
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
    });

    _defineProperty(this, "onRemoveItem", item => {
      const {
        value,
        maxSelections,
        minSelections,
        onChange
      } = this.props;
      const nextValue = computeItemPickerChangeValue({
        item,
        value,
        maxSelections,
        minSelections
      });

      if (nextValue !== false) {
        onChange(nextValue, item);
      }
    });

    _defineProperty(this, "renderItem", item => {
      const {
        renderItemContent,
        itemsNameKey
      } = this.props;
      const {
        isSingleSelection
      } = this.state;
      const {
        id,
        [itemsNameKey]: name
      } = item;
      return React.createElement(ItemPickerViewItem, _extends({
        key: id
      }, item, {
        isSingleSelection: isSingleSelection,
        item: item,
        onRemove: this.onRemoveItem,
        content: renderItemContent ? renderItemContent(item) : name
      }));
    });

    const {
      value: _value,
      items,
      maxSelections: _maxSelections
    } = props;
    const valueArray = castArray(_value);

    const filterItem = item => valueArray.indexOf(item.id) > -1;

    const selectedItems = items.filter(filterItem);

    const _isSingleSelection = typeof _value === 'number' || _value === null || _maxSelections === 1;

    this.focusInput = null;
    this.REF_INPUT = null;
    this.state = {
      isItemPickerVisible: false,
      selectedItems,
      isSingleSelection: _isSingleSelection,
      isMaxSelected: _isSingleSelection || _maxSelections && _maxSelections <= selectedItems.length
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      value,
      items,
      maxSelections
    } = this.props;

    if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
      const valueArray = castArray(value);

      const filterItem = item => valueArray.indexOf(item.id) > -1;

      const selectedItems = items.filter(filterItem);
      const isSingleSelection = typeof value === 'number' || value === null || maxSelections === 1;
      this.setState({
        selectedItems,
        isSingleSelection,
        isMaxSelected: isSingleSelection || maxSelections && maxSelections <= selectedItems.length
      });
    }
  }

  render() {
    const {
      className,
      classNameInvalid,
      classNameValid,
      items,
      itemsNameKey,
      itemsSearchConfig,
      childrenLeft,
      childrenRight,
      isProcessing,
      placeholder,
      onClick,
      isInput,
      isToggle,
      placeholderInput,
      onChangeInput,
      isItemPicker,
      classNameItemPicker,
      isValid,
      isInvalid
    } = this.props;
    const {
      selectedItems,
      isMaxSelected,
      isSingleSelection,
      isItemPickerVisible
    } = this.state;
    const isRenderInput = isInput && !isMaxSelected;
    const onClickFunc = isItemPicker ? this.onToggleItemPicker : onClick;
    let classNamesInvalid = '';
    let classNamesValid = '';

    if (isInvalid) {
      classNamesInvalid = `ItemPickerView__items--isInvalid ${classNameInvalid}`;
    } else if (isValid) {
      classNamesValid = `ItemPickerView__items--isValid ${classNameValid}`;
    }

    return React.createElement("div", {
      className: `ItemPickerView ${isSingleSelection ? 'ItemPickerView--isSingleSelection' : ''} ${className}`
    }, childrenLeft, React.createElement("div", {
      className: `ItemPickerView__items ${isSingleSelection ? 'ItemPickerView__items--isSingleSelection' : ''} ${isRenderInput ? 'ItemPickerView__items--isInput' : ''} ${isInvalid ? classNamesInvalid : isValid ? classNamesValid : ''}`,
      onClick: isRenderInput ? this.onFocusInput : onClickFunc
    }, React.createElement("div", {
      className: `ItemPickerView__items-wrapper ${isSingleSelection ? 'ItemPickerView__items-wrapper--isSingleSelection' : ''}`
    }, isProcessing && React.createElement("div", {
      className: "ItemPickerView__items-wrapper-processing"
    }, React.createElement(ActivityIndicator, {
      size: 20
    })), selectedItems.length ? selectedItems.map(this.renderItem) : isSingleSelection && React.createElement("div", {
      className: "ItemPickerView__items-wrapper-placeholder"
    }, placeholder), isRenderInput && React.createElement(ItemPickerViewInput, {
      setFocusInputFunc: this.setFocusInputFunc,
      placeholder: placeholder,
      placeholderInput: placeholderInput,
      items: items,
      itemsSelected: selectedItems,
      itemsNameKey: itemsNameKey,
      itemsSearchConfig: itemsSearchConfig,
      onSubmit: this.onAddItem,
      onRemove: this.onRemoveItem,
      onChangeInput: onChangeInput
    }))), isToggle && React.createElement("div", {
      className: "ItemPickerView__dropdown",
      onClick: onClickFunc
    }, React.createElement(FontAwesomeIcon, {
      icon: faCaretDown
    })), childrenRight, isItemPicker && React.createElement(ItemPicker, _extends({}, this.props, {
      className: `ItemPickerView__ItemPicker ${classNameItemPicker}`,
      isVisible: isItemPickerVisible,
      onClose: this.onToggleItemPicker
    })));
  }

}

_defineProperty(ItemPickerView, "propTypes", { ...ItemPickerGlobalPropTypes,
  classNameValid: PropTypes.string,
  classNameInvalid: PropTypes.string,
  isItemPicker: PropTypes.bool,
  isToggle: PropTypes.bool,
  isInput: PropTypes.bool,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  classNameItemPicker: PropTypes.string,
  childrenLeft: PropTypes.any,
  childrenRight: PropTypes.any,
  placeholder: PropTypes.string,
  placeholderInput: PropTypes.string,
  onChangeInput: PropTypes.func
});

_defineProperty(ItemPickerView, "defaultProps", { ...ItemPickerGlobalDefaultProps,
  classNameValid: '',
  classNameInvalid: '',
  isItemPicker: true,
  isToggle: true,
  isValid: false,
  isInvalid: false,
  isInput: false,
  classNameItemPicker: '',
  childrenLeft: null,
  childrenRight: null,
  placeholder: '',
  placeholderInput: '...',
  onChangeInput: null
});