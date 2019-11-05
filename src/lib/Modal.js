import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import OutsideClick from './OutsideClick';

export default class Modal extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onClose: PropTypes.func,
        className: PropTypes.string,
        classNameDialog: PropTypes.string,
        children: PropTypes.any.isRequired
    }

    static defaultProps = {
        onClose: () => {},
        className: '',
        classNameDialog: ''
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
        const { isVisible, onClose, className, classNameDialog, children } = this.props;

        if (!isVisible) {
            return null;
        }

        return (
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
                            className='Modal__dialog-content'
                            onOutsideClick={onClose}
                            event='click'>
                            {children}
                        </OutsideClick>
                    </div>
                </div>
            </>
        );
    }
}
