import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        onError: PropTypes.func,
        errorChildren: PropTypes.any,
        children: PropTypes.any
    }

    static defaultProps = {
        errorChildren: 'Oops, an error occurred !'
    }

    static getDerivedStateFromError() {
        return {
            isError: true
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            isError: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { pathname } = this.props;
        const { isError } = this.state;

        if (pathname !== nextProps.pathname ||
            isError !== nextState.isError) {
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps) {
        const { pathname } = this.props;
        const { isError } = this.state;

        if (isError && pathname !== prevProps.pathname) {
            this.setState({
                isError: false
            });
        }
    }

    componentDidCatch(error, info) {
        const { onError } = this.props;

        onError && onError(error, info);
    }

    render() {
        const { errorChildren, children } = this.props;
        const { isError } = this.state;

        if (isError) {
            return (
                <div className='ErrorBoundary'>
                    {errorChildren}
                </div>
            );
        }

        return children;
    }
}
