function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import OutsideClick from './OutsideClick';
export default class Modal extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "onCloseByKey", e => {
      const {
        onClose
      } = this.props;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    });

    const {
      isVisible
    } = props;

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this.onCloseByKey);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isVisible
    } = this.props;

    if (isVisible !== prevProps.isVisible) {
      if (isVisible) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.onCloseByKey);
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.onCloseByKey);
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.onCloseByKey);
  }

  render() {
    const {
      isVisible,
      onClose,
      className,
      classNameDialog,
      children
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "ModalBackdrop"
    }), React.createElement("div", {
      className: `Modal ${className}`,
      role: "dialog",
      "aria-modal": true,
      tabIndex: -1
    }, React.createElement("div", {
      className: `Modal__dialog ${classNameDialog}`,
      role: "document"
    }, React.createElement(OutsideClick, {
      className: "Modal__dialog-content",
      onOutsideClick: onClose,
      event: "click"
    }, children, "sadf"))));
  }

}

_defineProperty(Modal, "propTypes", {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  classNameDialog: PropTypes.string,
  children: PropTypes.any.isRequired
});

_defineProperty(Modal, "defaultProps", {
  onClose: () => {},
  className: '',
  classNameDialog: ''
});