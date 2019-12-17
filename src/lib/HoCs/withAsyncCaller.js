/* eslint-disable no-throw-literal */

import React, { PureComponent } from 'react';

const AXIOS = window._BaseAxios || { isCancel: () => false };

/**
 * api/async request handler
 * @param {Component} Component
 * @returns {Component}
 */
export function withAsyncCaller(Component) {
    return class WithAsyncCaller extends PureComponent {
        constructor(props) {
            super(props);

            this._isMounted = true;
            this.cancelTokenKeyIndex = 0;
            this.cancelTokens = {};
            this.state = {};
        }

        componentWillUnmount() {
            this._isMounted = false;

            Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
        }

        onChildUnmount = () => {
            this._isMounted = false;

            Object.keys(this.cancelTokens).forEach(this.cancelTokenByKey);
        }

        cancelTokenByKey = (key) => {
            if (this.cancelTokens[key]) {
                this.cancelTokens[key].cancel();

                delete this.cancelTokens[key];
            }
        }

        generateCancelToken = (isAutoHandling = true) => {
            if (AXIOS.CancelToken) {
                const cancelToken = AXIOS.CancelToken.source();

                if (isAutoHandling) {
                    const cancelTokenKey = `CT${this.cancelTokenKeyIndex++}`;

                    this.cancelTokens[cancelTokenKey] = cancelToken;
                }

                return cancelToken;
            }

            return undefined;
        }

        apiCaller = (func, ...args) => {
            return this.caller(func, ...[...args, this.generateCancelToken()]);
        }

        apiCallerProps = (config, ...args) => {
            this.callerProps(config, ...[...args, this.generateCancelToken()]);
        }

        asyncCaller = (func, ...args) => {
            return this.caller(func, ...args);
        }

        asyncCallerProps = (config, ...args) => {
            this.callerProps(config, ...args);
        }

        caller = async (func, ...args) => {
            if (this._isMounted) {
                try {
                    const response = await func(...args);

                    if (this._isMounted) {
                        return response;
                    }

                    throw false;
                } catch (err) {
                    // If using without axios cancellation, isCancel() will never return true
                    if (!this._isMounted || AXIOS.isCancel(err)) {
                        throw false;
                    }

                    // Forward all throws not caused by component unmount or cancelled requests
                    throw err;
                }
            }
        }

        callerProps = (config, ...args) => {
            const {
                api, responseKey, responseDataKey,
                loadingKey, onSuccess, onError
            } = config;

            const request = async () => {
                let isCancelled = false;
                let newState = {};
                let response;
                let callback;

                try {
                    response = await api(...args);

                    if (this._isMounted) {
                        if (responseKey) {
                            newState[responseKey] = responseDataKey ? response[responseDataKey] : response;
                        }

                        if (onSuccess) {
                            callback = () => onSuccess(response);
                        }
                    }
                } catch (err) {
                    if (!this._isMounted && AXIOS.isCancel(err)) {
                        isCancelled = true;
                    } else {
                        response = err;

                        if (onError) {
                            callback = () => onError(err);
                        }
                    }
                } finally {
                    if (this._isMounted && !isCancelled) {
                        if (loadingKey) {
                            newState[loadingKey] = false;
                        }

                        newState = (responseKey || loadingKey) ? newState : null;

                        this.setState(newState, callback);
                    }
                }
            };

            if (this._isMounted) {
                if (loadingKey) {
                    this.setState({
                        [loadingKey]: true
                    }, request);
                } else {
                    request();
                }
            }
        }

        setOwnProps = (props) => {
            if (this._isMounted) {
                this.setState({ ...props });
            }
        }

        render() {
            return (
                <Component
                    {...this.state}
                    {...this.props}
                    onUnmount={this.onChildUnmount}
                    setOwnProps={this.setOwnProps}
                    apiCaller={this.apiCaller}
                    apiCallerProps={this.apiCallerProps}
                    asyncCaller={this.asyncCaller}
                    asyncCallerProps={this.asyncCallerProps}
                    generateCancelToken={this.generateCancelToken} />
            );
        }
    };
}
