function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Fuse from 'fuse.js';
import OutsideClick from './OutsideClick';
import ActivityIndicator from './ActivityIndicator';
import { castArray } from './utils/castArray';
import { classify } from './utils/classify'; // Config

import { ItemPickerGlobalPropTypes, ItemPickerGlobalDefaultProps } from './configs/ItemPickerConfig'; // ItemPicker

import ItemPickerItem from './ItemPicker/components/Item/ItemPickerItem';
import ItemPickerSearch from './ItemPicker/components/Search/ItemPickerSearch';
import { computeItemPickerChangeValue } from './ItemPicker/utils/computeItemPickerChangeValue';
export default class ItemPicker extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onSelectItem", item => {
      const {
        maxSelections,
        minSelections,
        onChange,
        value
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

    _defineProperty(this, "onChangeSearch", search => {
      const {
        items,
        itemsNameKey,
        itemsSearchConfig
      } = this.props;
      search = search.toLowerCase();

      if (!search) {
        this.setState({
          search,
          searchItems: []
        });
        return;
      }

      const fuseConfig = itemsSearchConfig || {
        keys: [itemsNameKey]
      };
      const fuse = new Fuse(items, fuseConfig);
      const results = fuse.search(search);

      const mapItem = ({
        item
      }) => item;

      this.setState({
        search,
        searchItems: results.map(mapItem)
      });
    });

    _defineProperty(this, "renderItem", item => {
      const {
        renderItemContent,
        itemsNameKey
      } = this.props;
      const {
        valueArray
      } = this.state;
      const {
        id,
        [itemsNameKey]: name
      } = item;
      const isActive = valueArray.indexOf(id) > -1;
      return /*#__PURE__*/React.createElement(ItemPickerItem, _extends({
        key: id
      }, item, {
        item: item,
        onSelect: this.onSelectItem,
        isActive: isActive,
        content: renderItemContent ? renderItemContent(item, isActive) : name
      }));
    });

    const {
      value: _value,
      items: _items,
      searchRenderItemTreshold
    } = props;
    this.state = {
      isSearch: _items.length > searchRenderItemTreshold,
      valueArray: castArray(_value),
      search: '',
      searchItems: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      value,
      items,
      searchRenderItemTreshold
    } = this.props;

    if (JSON.stringify(prevProps.value) !== JSON.stringify(value)) {
      this.setState({
        valueArray: castArray(value)
      });
    }

    if (prevProps.items.length !== items.length) {
      const isSearch = items.length > searchRenderItemTreshold;

      if (prevState.isSearch !== isSearch) {
        this.setState({
          isSearch
        });
      }
    }
  }

  render() {
    const {
      isVisible,
      isProcessing,
      items,
      onClose,
      className,
      outsideClickEvent,
      onChangeSearch,
      emptyText,
      emptySearchText,
      searchPlaceholderText,
      domPortalNode,
      style,
      isSearchAutoFocus
    } = this.props;
    const {
      isSearch,
      search,
      searchItems
    } = this.state;
    const renderItems = search ? searchItems : items;
    const classNames = {
      items: '',
      itemsEmpty: '',
      itemsProcessing: '',
      empty: ''
    };

    if (!isVisible) {
      return null;
    }

    if (className) {
      classNames.items = classify(className, '__items');
      classNames.itemsEmpty = classify(className, '__items-empty');
      classNames.itemsProcessing = classify(className, '__items-processing');
      classNames.empty = classify(className, '__empty');
    }

    const JSX = /*#__PURE__*/React.createElement(OutsideClick, {
      className: `ItemPicker ${className}`,
      style: style,
      event: outsideClickEvent,
      onOutsideClick: onClose
    }, isSearch && /*#__PURE__*/React.createElement(ItemPickerSearch, {
      search: search,
      isAutoFocus: isSearchAutoFocus,
      placeholder: searchPlaceholderText,
      onChange: onChangeSearch || this.onChangeSearch
    }), /*#__PURE__*/React.createElement("div", {
      className: `ItemPicker__items ${classNames.items}`
    }, renderItems.length ? renderItems.map(this.renderItem) : !search && !!emptyText && /*#__PURE__*/React.createElement("div", {
      className: `ItemPicker__items-empty ${classNames.itemsEmpty}`
    }, emptyText), isProcessing && /*#__PURE__*/React.createElement("div", {
      className: `ItemPicker__items-processing ${classNames.itemsProcessing}`
    }, /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: 20
    }))), !!(search && !searchItems.length) && /*#__PURE__*/React.createElement("div", {
      className: `ItemPicker__empty ${classNames.empty}`
    }, emptySearchText));
    return domPortalNode ? createPortal(JSX, domPortalNode) : JSX;
  }

}

_defineProperty(ItemPicker, "propTypes", { ...ItemPickerGlobalPropTypes,
  isVisible: PropTypes.bool.isRequired,
  isSearchAutoFocus: PropTypes.bool,
  onClose: PropTypes.func,
  outsideClickEvent: PropTypes.string,
  searchRenderItemTreshold: PropTypes.number,
  emptyText: PropTypes.string,
  emptySearchText: PropTypes.string,
  searchPlaceholderText: PropTypes.string,
  domPortalNode: PropTypes.any,
  // A native dom node
  style: PropTypes.object
});

_defineProperty(ItemPicker, "defaultProps", { ...ItemPickerGlobalDefaultProps,
  isSearchAutoFocus: true,
  outsideClickEvent: 'click',
  onClose: () => {},
  searchRenderItemTreshold: 8,
  emptyText: 'No items yet',
  emptySearchText: 'No matches',
  searchPlaceholderText: 'Search..',
  style: {}
});