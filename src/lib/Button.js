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
        href: PropTypes.string,
        route: PropTypes.string,
        routeProps: PropTypes.object,
        isDisabled: PropTypes.bool,
        isProcessing: PropTypes.bool,
        debounceTime: PropTypes.number,
        sizeActivityIndicator: PropTypes.number,
        onClick: PropTypes.func,
        children: PropTypes.any
    };

    static defaultProps = {
        className: '',
        classNameDisabled: '',
        classNameProcessing: '',
        classNameActivityIndicator: '',
        classNameLink: '',
        href: null,
        route: null,
        routeProps: {},
        label: '',
        isDisabled: false,
        isProcessing: false,
        debounceTime: 300,
        sizeActivityIndicator: 20
    };

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
    };

    debounce = () => {
        this.IS_DEBOUNCE = false;
    };

    render() {
        const {
            className, classNameDisabled, classNameProcessing, classNameLink, classNameActivityIndicator,
            onClick, label, route, routeProps, isDisabled, isProcessing, children, sizeActivityIndicator,
            debounceTime, href, ...props
        } = this.props;
        const classNameMain = (
            `Button
            ${isDisabled ? `Button--disabled ${classNameDisabled}` : ''}
            ${isProcessing ? `Button--processing ${classNameProcessing}` : ''}
            ${className}`
        );

        if (route) {
            // Internal Route
            return (
                <Link
                    {...props}
                    className={classNameMain}
                    onClick={this.onClick}
                    to={{ pathname: route, state: routeProps }}>
                    {isProcessing
                        ? <ActivityIndicator
                            classNameLoader={classNameActivityIndicator}
                            size={sizeActivityIndicator} />
                        : children || label
                    }
                </Link>
            );
        }

        if (href) {
            // Native Anchor
            return (
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    {...props}
                    className={classNameMain}
                    onClick={this.onClick}
                    href={href}>
                    {isProcessing
                        ? <ActivityIndicator
                            classNameLoader={classNameActivityIndicator}
                            size={sizeActivityIndicator} />
                        : children || label
                    }
                </a>
            );
        }

        // Custom Button
        return (
            <span
                {...props}
                className={classNameMain}
                onClick={this.onClick}>
                {isProcessing
                    ? <ActivityIndicator
                        classNameLoader={classNameActivityIndicator}
                        size={sizeActivityIndicator} />
                    : children || label
                }
            </span>
        );
    }
}
