import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ActivityIndicator from './ActivityIndicator';

export default class Button extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        classNameLink: PropTypes.string,
        classNameDisabled: PropTypes.string,
        classNameProcessing: PropTypes.string,
        classNameActivityIndicator: PropTypes.string,
        label: PropTypes.string,
        route: PropTypes.string,
        routeProps: PropTypes.object,
        isDisabled: PropTypes.bool,
        isProcessing: PropTypes.bool,
        debounceTime: PropTypes.number,
        sizeActivityIndicator: PropTypes.number,
        onClick: PropTypes.func,
        children: PropTypes.any
    }

    static defaultProps = {
        className: '',
        classNameDisabled: '',
        classNameProcessing: '',
        classNameActivityIndicator: '',
        classNameLink: '',
        route: null,
        routeProps: null,
        label: '',
        isDisabled: false,
        isProcessing: false,
        debounceTime: 500,
        sizeActivityIndicator: 20
    }

    constructor(props) {
        super(props);

        this.IS_DEBOUNCE = false;
        this.DEBOUNCE_TIMEOUT = null;
    }

    componentWillUnmount() {
        clearTimeout(this.DEBOUNCE_TIMEOUT);
    }

    onClick = (e) => {
        const { onClick, isDisabled, isProcessing, debounceTime } = this.props;

        if (onClick && !isDisabled && !isProcessing && !this.IS_DEBOUNCE) {
            if (debounceTime) {
                this.IS_DEBOUNCE = true;
            }

            onClick(e);

            if (debounceTime) {
                this.DEBOUNCE_TIMEOUT = setTimeout(this.debounce, debounceTime);
            }
        }
    }

    debounce = () => {
        this.IS_DEBOUNCE = false;
    }

    render() {
        const {
            className, classNameDisabled, classNameProcessing, classNameLink, classNameActivityIndicator, onClick,
            label, route, routeProps, isDisabled, isProcessing, children, sizeActivityIndicator, debounceTime, ...props
        } = this.props;

        return (
            <span
                {...props}
                className={`Button ${isDisabled ? `Button--disabled ${classNameDisabled}` : ''} ${isProcessing ? `Button--processing ${classNameProcessing}` : ''} ${className}`}
                onClick={this.onClick}>
                {isProcessing
                    ? <ActivityIndicator
                        classNameLoader={classNameActivityIndicator}
                        size={sizeActivityIndicator} />
                    : route
                        ? <Link
                            className={`Button__link ${classNameLink}`}
                            to={{
                                pathname: route,
                                state: routeProps
                            }}>
                            {children || label}
                        </Link>
                        : children || label
                }
            </span>
        );
    }
}
