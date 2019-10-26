function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react'; // NOTE: Careful when using non-instant event's like "click"
// If a component removes the clicked node before the click event triggers,
// it will count as an outside click!

export default class OutsideClick extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onOutsideClick", e => {
      const {
        onOutsideClick
      } = this.props;

      if (!this.REF.current.contains(e.target)) {
        onOutsideClick();
      }
    });

    this.REF = React.createRef();
    this.EVENT = props.event;
  }

  componentDidMount() {
    const {
      onOutsideClick
    } = this.props;

    if (onOutsideClick) {
      document.addEventListener(this.EVENT, this.onOutsideClick);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      onOutsideClick
    } = this.props;

    if (prevProps.onOutsideClick !== onOutsideClick) {
      document.removeEventListener(this.EVENT, this.onOutsideClick);

      if (onOutsideClick) {
        document.addEventListener(this.EVENT, this.onOutsideClick);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener(this.EVENT, this.onOutsideClick);
  }

  render() {
    const {
      onOutsideClick,
      children,
      event,
      ...props
    } = this.props;
    return React.createElement("div", _extends({}, props, {
      ref: this.REF
    }), children);
  }

}

_defineProperty(OutsideClick, "propTypes", {
  children: PropTypes.any.isRequired,
  onOutsideClick: PropTypes.func,
  event: PropTypes.string
});

_defineProperty(OutsideClick, "defaultProps", {
  event: 'mousedown'
});