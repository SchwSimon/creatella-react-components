function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withThrottledChange } from '../../../HOCs/withThrottledChange';

class ItemPickerSearch extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusInput", () => {
      if (this.REF_SEARCH.current) {
        this.REF_SEARCH.current.focus();
      }
    });

    _defineProperty(this, "onChangeSearch", e => {
      const {
        onChangeThrottled
      } = this.props;
      const search = e.target.value;
      this.setState({
        search
      });
      onChangeThrottled(search, this.onSearch);
    });

    _defineProperty(this, "onSearch", search => {
      const {
        onChange
      } = this.props;
      onChange(search);
    });

    const {
      search: _search
    } = props;
    this.REF_SEARCH = React.createRef();
    this.state = {
      search: _search || ''
    };
  }

  componentDidMount() {
    const {
      isAutoFocus
    } = this.state;

    if (isAutoFocus) {
      requestAnimationFrame(this.focusInput);
    }
  }

  render() {
    const {
      placeholder
    } = this.props;
    const {
      search
    } = this.state;
    return /*#__PURE__*/React.createElement("input", {
      ref: this.REF_SEARCH,
      className: "ItemPickerSearch",
      placeholder: placeholder,
      value: search,
      onChange: this.onChangeSearch
    });
  }

}

_defineProperty(ItemPickerSearch, "propTypes", {
  onChangeThrottled: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.string,
  isAutoFocus: PropTypes.bool.isRequired
});

export default withThrottledChange(ItemPickerSearch, 250);