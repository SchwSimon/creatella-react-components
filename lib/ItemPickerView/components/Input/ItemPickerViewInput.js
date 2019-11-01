function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';
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
      this.setState({
        value
      });
      onChangeInput && onChangeInput(value);
    });

    _defineProperty(this, "onKeyDown", e => {
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

      if (e.key === 'Enter' && value) {
        const fuseConfig = itemsSearchConfig || {
          keys: [itemsNameKey]
        };
        const fuse = new Fuse(items, fuseConfig);
        const results = fuse.search(value);
        const matchItem = results && results[0];

        if (matchItem && onSubmit(matchItem)) {
          this.setState({
            value: ''
          });
        }
      } else if (e.key === 'Backspace' && !value && itemsSelected.length) {
        const item = itemsSelected[itemsSelected.length - 1];
        const value = item[itemsNameKey];
        this.blurInput();
        this.setState({
          value
        });
        onRemove(item);
        requestAnimationFrame(() => {
          this.focusInput(value.length);
        });
      }
    });

    this.REF_INPUT = React.createRef();
    this.state = {
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
      value
    } = this.state;
    return React.createElement("div", {
      className: "ItemPickerViewInput"
    }, React.createElement("input", {
      ref: this.REF_INPUT,
      className: "ItemPickerViewInput__input",
      placeholder: !itemsSelected.length ? placeholder : placeholderInput,
      value: value,
      onKeyDown: this.onKeyDown,
      onChange: this.onChangeValue
    }));
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