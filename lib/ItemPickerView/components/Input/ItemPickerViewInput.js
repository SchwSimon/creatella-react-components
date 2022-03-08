function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';
import ItemPickerViewItem from '../Item/ItemPickerViewItem';
import OutsideClick from '../../../OutsideClick';
export default class ItemPickerViewInput extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusInput", length => {
      if (this.REF_INPUT.current) {
        if (length) {
          this.REF_INPUT.current.selectionStart = length;
          this.REF_INPUT.current.selectionEnd = length;
        }

        this.REF_INPUT.current.focus();
      }
    });

    _defineProperty(this, "blurInput", () => {
      if (this.REF_INPUT.current) {
        this.REF_INPUT.current.blur();
      }
    });

    _defineProperty(this, "onChangeValue", e => {
      const {
        onChangeInput
      } = this.props;
      const value = e.target.value;
      const nextState = {
        value
      };

      if (!value) {
        nextState.isMatchVisible = false;
        nextState.match = null;
      }

      this.setState(nextState);
      onChangeInput && onChangeInput(value);
    });

    _defineProperty(this, "onKeyUp", e => {
      const {
        onSubmit,
        onRemove,
        itemsSelected,
        itemsNameKey,
        items,
        itemsSearchConfig
      } = this.props;
      const {
        value
      } = this.state;

      if (e.key === 'Backspace' && !value && itemsSelected.length) {
        const item = itemsSelected[itemsSelected.length - 1];
        const value = item[itemsNameKey];
        this.blurInput();
        this.setState({
          value,
          match: item,
          isMatchVisible: true
        });
        onRemove(item);
        requestAnimationFrame(() => {
          this.focusInput(value.length);
        });
      } else if (value) {
        const fuseConfig = itemsSearchConfig || {
          keys: [itemsNameKey]
        };
        const fuse = new Fuse(items, fuseConfig);
        const results = fuse.search(value);
        const matchItem = results.length && results[0].item;
        const {
          top,
          left
        } = this.REF_INPUT.current.getBoundingClientRect();
        const nextState = {
          isMatchVisible: true,
          match: matchItem,
          matchPosX: left,
          matchPosY: top
        };

        if (e.key === 'Enter' && matchItem && onSubmit(matchItem)) {
          nextState.value = '';
          nextState.match = null;
        }

        this.setState(nextState);
      }
    });

    _defineProperty(this, "onSelectMatch", () => {
      const {
        onSubmit
      } = this.props;
      const {
        match
      } = this.state;
      onSubmit(match);
      this.setState({
        isMatchVisible: false,
        match: null,
        value: ''
      });
    });

    _defineProperty(this, "onShowMatch", () => {
      const {
        match
      } = this.state;
      const {
        top,
        left
      } = this.REF_INPUT.current.getBoundingClientRect();
      this.setState({
        isMatchVisible: !!match,
        matchPosX: left,
        matchPosY: top
      });
    });

    _defineProperty(this, "onHideMatch", () => {
      this.setState({
        isMatchVisible: false
      });
    });

    this.REF_INPUT = /*#__PURE__*/React.createRef();
    this.state = {
      isMatchVisible: false,
      match: null,
      matchPosX: 0,
      matchPosY: 0,
      value: ''
    };
  }

  componentDidMount() {
    const {
      setFocusInputFunc
    } = this.props;
    setFocusInputFunc(this.focusInput);
    requestAnimationFrame(this.focusInput);
  }

  render() {
    const {
      placeholder,
      placeholderInput,
      itemsSelected
    } = this.props;
    const {
      value,
      isMatchVisible,
      match,
      matchPosX,
      matchPosY
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "ItemPickerViewInput"
    }, /*#__PURE__*/React.createElement("input", {
      ref: this.REF_INPUT,
      className: "ItemPickerViewInput__input",
      placeholder: !itemsSelected.length ? placeholder : placeholderInput,
      value: value,
      onFocus: this.onShowMatch,
      onKeyUp: this.onKeyUp,
      onChange: this.onChangeValue
    }), isMatchVisible && !!match && /*#__PURE__*/React.createElement(OutsideClick, {
      className: "ItemPickerViewInput__match",
      style: {
        left: matchPosX - 5,
        top: matchPosY + 20
      },
      onOutsideClick: this.onHideMatch
    }, /*#__PURE__*/React.createElement(ItemPickerViewItem, {
      onClick: this.onSelectMatch
    }, match.name)));
  }

}

_defineProperty(ItemPickerViewInput, "propTypes", {
  setFocusInputFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  placeholderInput: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemsSelected: PropTypes.array.isRequired,
  itemsNameKey: PropTypes.string.isRequired,
  itemsSearchConfig: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func
});