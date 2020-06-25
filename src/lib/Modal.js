import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import OutsideClick from './OutsideClick';

export default class Modal extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onClose: PropTypes.func,
        className: PropTypes.string,
        classNameDialog: PropTypes.string,
        classNameContent: PropTypes.string,
        children: PropTypes.any.isRequired
    }

    static defaultProps = {
        onClose: () => {},
        className: '',
        classNameDialog: '',
        classNameContent: ''
    }

    constructor(props) {
        super(props);

        const { isVisible } = props;

        if (isVisible) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', this.onCloseByKey);
        }
    }

    componentDidUpdate(prevProps) {
        const { isVisible } = this.props;

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

    onCloseByKey = (e) => {
        const { onClose } = this.props;

        if (e.key === 'Escape') {
            e.preventDefault();

            onClose();
        }
    }

    render() {
        const { isVisible, onClose, className, classNameDialog, classNameContent, children } = this.props;

        if (!isVisible) {
            return null;
        }

        return createPortal(
            <>
                <div className='ModalBackdrop' />

                <div
                    className={`Modal ${className}`}
                    role='dialog'
                    aria-modal={true}
                    tabIndex={-1}>
                    <div
                        className={`Modal__dialog ${classNameDialog}`}
                        role='document'>
                        <OutsideClick
                            className={`Modal__dialog-content ${classNameContent}`}
                            onOutsideClick={onClose}>
                            {children}
                        </OutsideClick>
                    </div>
                </div>
            </>,
            document.body
        );
    }
}
